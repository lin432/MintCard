const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const request = require('request');
const app = express();
const { check, body, param, query, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
const cookie = require('cookie');
const session = require('express-session');
const { Client } = require('@elastic/elasticsearch')

let elasticHost = 'localhost';
let postgresHost = 'localhost';
let kibanaHost = 'localhost';

if (process.env.NODE_ENV === 'production') {
    elasticHost = 'elasticsearch-node-svc';
    postgresHost = 'postgres';
    kibanaHost = 'kibana-node-svc'
}

const elasticClient = new Client({ node: 'http://' + elasticHost + ':9200' })
const cloudFrontDomain = 'https://d2h5k8hi1yo0ql.cloudfront.net/';

app.use(session({
    secret: 'mint card project secret',
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true}
}));

const pgp = require('pg-promise')();
const cn = {
    host: postgresHost, // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'CSCC09',
    user: 'C09',
    password: 'password'
};
const db = pgp(cn);
const uuid = require('uuid');
const uuidv4 = uuid.v4;

// https://www.positronx.io/express-cors-tutorial/
const origins = ['http://localhost:3000', 'http://localhost:4200', 'https://mintcard.me'];
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        // allow requests with no origin 
        if (!origin) return callback(null, true);
        if (origins.indexOf(origin) === -1) {
            const message = `${origin} FAILED CORS`;
            return callback(message, false);
        }
        return callback(null, true);
    }
}));

const kibanaURL = 'http://' + kibanaHost + ':5601';

function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function generateHash(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

const isAuthenticated = function (req, res, next) {
    if (!req.session.username) return res.status(401).end("access denied");
    next();
};

app.use(function (req, res, next) {
    console.log("HTTPS request", req.method, req.url, req.body);
    const username = (req.session.username) ? req.session.username : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

let isFormatted = function (req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

let ownsDeck = function (req, res, next) {
    if (!req.params.id) {
        res.status(500).end('MISUSED IMPLEMENTATION');
    }
    if (!req.session.username) {
        res.status(500).end('NOT SIGNED IN');
    }

    const id = req.params.id;
    const attemptor = req.session.username;

    db.one({
        text: `SELECT id, name, owner, description, cards FROM "C09"."Decks" WHERE id = $1`,
        values: [id]
    }).then(data => {
        if (data.owner !== attemptor) {
            res.status(401).end('NOT AUTHORIZED');
        } else {
            next();
        }
    }).catch(err => {
        if (err.received === 0) {
            res.status(404).end('ITEM NOT FOUND');
        }
        res.status(500).end('SQL QUERY FAILED');
    });
};


//User object
// {
//     user: "string"
//     userid: "string"
// }
//Deck object
// {
//     deckId: "string"
//     name: "string"
//     description: "string"
//     cards: Array<"uuid of card">
//     owner: "userid"
// }
//Card object
// https://mtgjson.com/files/standard-cards/

// Constructor for Deck objects
let Deck = (function () {
    return function item(owner, id, name, description, cards) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.description = description;
        this.cards = cards;
    };
}());

// - request: `POST /api/deck/`
app.post('/api/deck', [
    isAuthenticated,
    body('name').rtrim().escape(),
    body('description').rtrim().escape(),
    body('cards').isArray(),
    isFormatted
], function (req, res, next) {
    // make deck
    const deck = new Deck(req.session.username, uuidv4(), req.body.name, req.body.description, req.body.cards);

    db.one({
        text: `INSERT INTO "C09"."Decks"(id, name, owner, description, cards) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        values: [deck.id, deck.name, deck.owner, deck.description, deck.cards]
    }).then((data) => {
        res.json(deck);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    });
});

// - request: `GET /api/deck/[?ownerId="userId"][?top=10][?page=1]`
app.get('/api/deck', [
    query('ownerId').isAlphanumeric(),
    query('top').isInt(),
    query('page').isInt()
], function (req, res, next) {
    // get params (sanitized)
    const errors = validationResult(req).array();
    const ownerId = (req.query.ownerId && !errors.find(error => error.param === "ownerId")) ? req.query.ownerId : null;
    const top = (req.query.top && !errors.find(error => error.param === "top")) ? req.query.top : 10;
    const page = (req.query.page && !errors.find(error => error.param === "page")) ? req.query.page : null;

    // form query
    const values = [];
    let query = `SELECT id, name, owner, description, cards FROM "C09"."Decks"`;
    if (ownerId) { values.push(ownerId); query = query + ` WHERE owner = $${values.length}`; }
    if (page) { values.push((page - 1) * top); query = query + ` OFFSET $${values.length}`; }
    if (top) { values.push(top); query = query + ` LIMIT $${values.length}`; }
    query = query + ';';

    //get results
    db.any({
        text: query,
        values: values
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    });
});

// - request: `PATCH /api/deck/:deckId`
app.patch('/api/deck/:id/', [
    isAuthenticated,
    param('id').isUUID(),
    isFormatted,
    ownsDeck,
    body('name').rtrim().escape(),
    body('description').rtrim().escape(),
    body('cards').isArray()
], function (req, res, next) {
    // sanitize body elements
    const errors = validationResult(req).array();
    const name = (req.body.name && !errors.find(error => error.param === "name")) ? req.body.name : null;
    const description = (req.body.description && !errors.find(error => error.param === "description")) ? req.body.description : null;
    const cards = (req.body.cards && !errors.find(error => error.param === "cards")) ? req.body.cards : null;

    const deck = new Deck(req.session.username, req.params.id, name, description, cards);

    // modify deck query
    db.one({
        text: `UPDATE "C09"."Decks" SET name=$1, description=$2, cards=$3 WHERE id = $4 RETURNING id;`,
        values: [deck.name, deck.description, deck.cards, deck.id]
    }).then(() => {
        // send results
        res.json(deck);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    });

});

// - request: `DELETE /api/deck/:deckId`
app.delete('/api/deck/:id/', [
    isAuthenticated,
    param('id').isUUID(),
    isFormatted,
    ownsDeck
], function (req, res, next) {
    // modify deck query
    db.one({
        text: `DELETE FROM "C09"."Decks" WHERE id = $1 RETURNING id;`,
        values: [req.params.id]
    }).then(() => {
        // send results
        res.json(req.params.id);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    });
});

// curl localhost:3000/api/card/2
app.get('/api/card/:cardId', [
    param('cardId').isAlphanumeric(),
    isFormatted
], (req, res) => {
    db.one({
        text: 'SELECT * FROM "C09"."Cards" WHERE "cardId"=$1;',
        values: [req.params.cardId]
    }).then(data => {
        return res.json(data);
    }).catch(error => {
        if (error.code === pgp.errors.queryResultErrorCode.noData) {
            return res.sendStatus(404).end(error.message);
        }
        return res.sendStatus(500).end(error.message);
    });
});


// curl localhost:3000/api/card/image/1000
app.get('/api/card/image/byIds/', [
    query('ids').isArray(),
    isFormatted
], (req, res) => {
    // build string for db execution
    let values = '';
    req.query.ids.forEach((id) => values = values + id + ',');
    values = values.slice(0, values.length - 1);

    const query = `SELECT cardid, path FROM "C09"."Images" WHERE "cardid" in (${values});`;
    db.any({
        text: query
    }).catch(error => {
        console.log(error);
        if (error.code === pgp.errors.queryResultErrorCode.noData) {
            return res.sendStatus(404).end(error.message);
        }
        return res.sendStatus(500).end();
    }).then(response => {
        const returnArr = [];
        response.forEach(data => returnArr.push({ imageURL: cloudFrontDomain + data.path + '.jpeg', cardId: data.cardid }));
        return res.json(returnArr);
    });
});

// curl localhost:3000/api/card/image/1000
app.get('/api/card/image/:cardId/', [
    param('cardId').isAlphanumeric(),
    isFormatted
], (req, res) => {
    db.one({
        text: 'SELECT "path" FROM "C09"."Images" WHERE "cardid"=$1',
        values: [req.params.cardId]
    }).then(data => {
        return res.json({ imageURL: cloudFrontDomain + data.path + '.jpeg' });
    }).catch(error => {
        console.log(error);
        if (error.code === pgp.errors.queryResultErrorCode.noData) {
            return res.sendStatus(404).end(error.message);
        }
        return res.sendStatus(500).end(error.message);
    });
});

// will probably / change the properties
const advancedSearchProperties = [
    'colors',
    'manaCost',
    'name',
    'subtypes',
    'type',
    'supertypes',
    'text',
    'types',
    'uuid',
    'power',
    'toughness'
];

// curl -H "Content-Type: application/json" -X POST -d '{"name":"Absorb"}' localhost:3000/api/card/advanced/
app.post('/api/card/advanced/', [
    body('colors').isArray(),
    body('name').isAlphanumeric(),
    body('subtypes').isArray(),
    body('type').isAlphanumeric(),
    body('supertypes').isArray(),
    body('text').isAlphanumeric(),
    body('types').isArray(),
    body('power').isAlphanumeric(),
    body('toughness').isAlphanumeric(),
    body('uuid').isUUID()
], (req, res) => {
    // mana cost has special chars
    if (req.body.manaCost) {
        body('manaCost').escape();
    }

    let body = req.body;
    let emptyQuery = true;

    // building the query
    const errors = validationResult(req).array();
    let query = {};
    advancedSearchProperties.forEach(prop => {
        if (prop in body) {
            if (errors.find(error => error === prop)) {
                res.sendStatus(405).end('Invalid parameter: ' + prop)
            }
            query[prop] = body[prop];
            if (emptyQuery) {
                emptyQuery = !emptyQuery;
            }
        }
    });
    // check for empty query
    if (emptyQuery) return res.sendStatus(405).end('No queries sent');

    db.any({
        text: 'SELECT * FROM "C09"."Cards" WHERE "data" @>$1 LIMIT 100',
        values: query
    }).then(cards => {
        return res.json(cards);
    }).catch(error => {
        if (error.code === pgp.errors.queryResultErrorCode.noData) {
            return res.sendStatus(404).end(error.message);
        }
        return res.sendStatus(500).end(error.message);
    });
});

const language = require('@google-cloud/language');
const GOOGLE_CREDENTIALS = 'local-snow-271101-a3f2d5e6eeca.json';
const googleClient = new language.LanguageServiceClient({ keyFilename: GOOGLE_CREDENTIALS });
// curl -H "Content-Type: application/json" -X POST -d '{"text":"Card that is type instant, casting uses 1 blue and 1 white."}' localhost:3000/api/card/ml/
app.post('/api/card/ml/', body('text').not().isEmpty().trim().escape(), async (req, res) => {

    let text = req.body.text;
    let document = { content: text, type: 'PLAIN_TEXT' };
    const encodingType = 'UTF8';

    try {
        const [syntax] = await googleClient.analyzeSyntax({ document, encodingType });
        let syntaxProps = parseSyntax(syntax);
        let query = {};
        advancedSearchProperties.forEach(prop => {
            if (prop in syntaxProps) {
                query[prop] = syntaxProps[prop];
            }
        });

        db.any({
            text: 'SELECT * FROM "C09"."Cards" WHERE lower("data"::text)::jsonb' +
                '@>lower($1)::jsonb',
            values: query
        }).then(cards => {
            return res.json(cards);
        }).catch(error => {
            if (error.code === pgp.errors.queryResultErrorCode.noData) {
                return res.sendStatus(404).end(error.message);
            }
            console.log(error);
            return res.sendStatus(500).end(error.message);
        });
    } catch (error) {
        return res.sendStatus(500).end();
    }
});

const colors = new Set(['white', 'red', 'green', 'blue', 'black']);
const typeSynonyms = new Set(['type', 'types', 'supertypes', 'subtypes',
    'kind', 'sort', 'variety', 'class', 'category', 'classification',
    'group', 'set', 'bracket', 'genre', 'family', 'order', 'style', 'race']);
function parseSyntax(syntax) {
    let type = null;
    let colorsArr = [];
    syntax.tokens.forEach(token => {
        if (typeSynonyms.has(token.text.content)) {
            type = syntax.tokens[token.dependencyEdge.headTokenIndex].text.content;
        }
        if (colors.has(token.text.content)) {
            if (token.text.content === 'blue') {
                colorsArr.push('U');
            } else {
                colorsArr.push(token.text.content[0].toUpperCase());
            }
        }
    });
    return { type: type, colors: colorsArr };
}

// gets the proeprties of cards from the db then returns an observable
let getCardsFromDB = function (cards) {
    let values = '';
    cards.forEach((id) => values = values + id + ',');
    values = values.slice(0, values.length - 1);
    const query = `SELECT * FROM "C09"."Cards" Where "cardId" in (${values});`;
    console.log(query);
    return db.any({
        text: query
    });
};

// simple endpoint that gets properties of cards from DB and returns it to the requester
app.post('/api/card/byIds/', [body('cardIds').isArray(), isFormatted], function (req, res, next) {
    // handle no cards to query case
    if (req.body.cardIds.length < 1) {
        return res.json([]).end();
    }

    getCardsFromDB(req.body.cardIds).catch((err) => {
        console.log(err);
        return res.status(500).end();
    }).then(response => {
        return res.json(response);
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"text":"Gain 3 life. Troll."}' localhost:3000/api/card/elastic/
app.post('/api/elastic/card/', body('text').not().isEmpty().trim().escape(), (req, res) => {
    let query = { query: { query_string: { query: req.body.text } } };
    try {
        elasticClient.search({
            index: 'cards',
            body: query,
            size: 40
        }, (err, response) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500).end();
            }
            return res.json(response.body.hits.hits);
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).end();
    }
});

// function to return unique elastic index (as name must be lower case)
let getUserElasticIndex = function (name) {
    const length = name.length;
    for (let i = 0; i < length; i++) {
        const char = name.charAt(i);
        if (char === char.toUpperCase()) {
            //append lowercase variant to end of string
            name = name + char.toLowerCase();
        }
    }

    return name.toLowerCase();
};

// checks to see if the user elasticIndex is on, if it is off then we create it
let insureUserElasticIndex = function (req, res, next) {
    if (!req.session.username) {
        return res.status(401).end();
    }

    const indexName = getUserElasticIndex(req.session.username);

    if (!req.session.elasticIndexCreated) {
        //check if it already exists b/c of not cleaned up
        elasticClient.indices.exists({
            index: indexName
        }, (err, response) => {
            if (err) {
                return res.sendStatus(500).end();
            } else {
                if (!response.body) {

                    // does not exist so we create it
                    elasticClient.indices.create({
                        index: indexName
                    }, (err, response2) => {
                        if (err) {
                            return res.sendStatus(500).end();
                        }
                        // set flag as it is now created
                        req.session.elasticIndexCreated = true;
                        next();
                    });

                } else {
                    // set flag as it already exists
                    req.session.elasticIndexCreated = true;
                    next();
                }
            }
        });
    } else {
        next();
    }
};

// empties index of values (when we want to refresh with new deck data)
let cleanUserElasticIndex = function (req, res, next) {
    if (!req.session.username) {
        return res.setStatus(401).end();
    }

    const indexName = getUserElasticIndex(req.session.username);

    // check index exists (done as elastic can take a while to start)
    elasticClient.indices.exists({
        index: indexName
    }, (err, response) => {
        if (err) {
            return res.sendStatus(500).end();
        } else {
            if (response.body) {
                // set flag as it already exists
                req.session.elasticIndexCreated = true;

                // deletes all items in index
                elasticClient.deleteByQuery({
                    index: indexName,
                    body: {
                        "query": {
                            "match_all": {}
                        }
                    }
                }, (err, response) => {
                    if (err) {
                        return res.sendStatus(500).end();
                    }
                    next();
                });

            } else {
                // not found so we check our flag to point us
                if (!req.session.elasticIndexCreated) {
                    return res.setStatus(425).end();
                }

                next();
            }
        }
    });


};

// updates the elastic index with the card properties of all cards in the deck
app.post('/api/elastic/load/', [
    body('cards').isArray(),
    insureUserElasticIndex,
    cleanUserElasticIndex
], function (req, res, next) {
    // parse errors in validation
    const errors = validationResult(req).array();
    const cards = (req.body.cards && !errors.find(error => error.param === "cards")) ? req.body.cards : null;
    const indexName = getUserElasticIndex(req.session.username);

    // Get card properties from DB first
    getCardsFromDB(cards)
        .catch(err => { return res.status(500).end() })
        .then(response => {
            // build list of cards
            const esArr = [];
            for (let i = 0; i < cards.length; i++) {
                const find = response.find(item => item.cardId === +cards[i]);
                if (!find) {
                    return res.status(500).end()
                }
                // flatten with unique id so we can have duplicate cards
                const temp = find.data;
                temp['id'] = i;
                // format for bulk operation in elasticClient
                esArr.push({ index: { _index: indexName } });
                esArr.push(JSON.parse(JSON.stringify(temp)));
            }

            // index all entries with bulk command
            elasticClient.bulk({ refresh: true, body: esArr })
                .catch(err => { return res.status(500).end(); })
                .then(response => {
                    if (response.body.errors) {
                        return res.status(500).end();
                    }
                    return res.json({ complete: true });
                });
        });
});

// Query saved objects to find a value
let kibanaFind = function (callback, fields, type, searchField, searchValue, hasReference) {
    // default find (note id is default for us)
    let url = kibanaURL + '/api/saved_objects/_find?fields=id';

    // add any other fields to include
    fields.forEach(field => url = url + `&fields=${field}`);

    // separate by type
    if (type) {
        url = url + '&type=' + type
    }

    // filtering
    if (searchField && searchValue) {
        url = url + '&search_fields=' + searchField;
        url = url + '&search=' + searchValue;
    }

    if (hasReference) {
        url = url + "&has_reference=" + hasReference;
    }

    const options = {
        uri: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'kbn-xsrf': 'anything'
        }
    };

    request(options, (err, response) => callback(err, response.body ? JSON.parse(response.body) : null));
};

// checks if index pattern exists
let getIndexPattern = function (index, callback) {
    // get title and field and filter by index name
    kibanaFind(callback, ['title', 'type'], 'index-pattern', 'title', index);
};

// request to kibana to make index pattern
let makeIndexPattern = function (index, callback) {
    const body = {
        attributes: {
            title: index,
            fields: "[]"
        }
    };
    const options = {
        uri: kibanaURL + '/api/saved_objects/index-pattern',
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'kbn-xsrf': 'anything'
        }
    };
    request(options, (err, response) => callback(err, response));
};

// insures index pattern is created in kibana
let insureIndexPattern = function (req, res, next) {
    // check prerequisites
    if (!req.session.username) {
        return res.status(401).end();
    }
    if (!req.session.elasticIndexCreated) {
        return res.status(425).end();
    }

    const indexName = getUserElasticIndex(req.session.username);

    // check if it already exists
    getIndexPattern(indexName, function (err, response) {
        if (err) {
            return res.status(500).end();
        }

        if (response.total === 0) {
            // doesn't so we create a new index pattern
            makeIndexPattern(indexName, function (err, response2) {
                if (response2 && response2.statusCode > 199 && response2.statusCode < 300) {
                    const body = JSON.parse(response2.body);
                    req.session.indexPatternId = body.id;
                    next()
                } else {
                    return res.status(500).end();
                }
            });
        } else {
            req.session.indexPatternId = response.saved_objects[0].id;
            next();
        }
    });
};

const kibanaVisTitle = {
    "CMC": "CMC of Deck",
    "CMCHeatMap": "CMC of Deck by Colors",
    "CardTypeBar": "Deck by Card Type"
};

// builds CMC visualization body
let kibanaVisCMCBody = function (indexId) {
    const title = kibanaVisTitle['CMC'];
    return {
        "attributes": {
            "title": title,
            "visState": `{\"title\":\"${title}\",\"type\":\"histogram\",\"params\":{\"type\":\"histogram\",\"grid\":{\"categoryLines\":false},\"categoryAxes\":[{\"id\":\"CategoryAxis-1\",\"type\":\"category\",\"position\":\"bottom\",\"show\":true,\"style\":{},\"scale\":{\"type\":\"linear\"},\"labels\":{\"show\":true,\"filter\":true,\"truncate\":100},\"title\":{}}],\"valueAxes\":[{\"id\":\"ValueAxis-1\",\"name\":\"LeftAxis-1\",\"type\":\"value\",\"position\":\"left\",\"show\":true,\"style\":{},\"scale\":{\"type\":\"linear\",\"mode\":\"normal\"},\"labels\":{\"show\":true,\"rotate\":0,\"filter\":false,\"truncate\":100},\"title\":{\"text\":\"Count\"}}],\"seriesParams\":[{\"show\":true,\"type\":\"histogram\",\"mode\":\"stacked\",\"data\":{\"label\":\"Count\",\"id\":\"1\"},\"valueAxis\":\"ValueAxis-1\",\"drawLinesBetweenPoints\":true,\"lineWidth\":2,\"showCircles\":true}],\"addTooltip\":true,\"addLegend\":true,\"legendPosition\":\"right\",\"times\":[],\"addTimeMarker\":false,\"labels\":{\"show\":false},\"thresholdLine\":{\"show\":false,\"value\":10,\"width\":1,\"style\":\"full\",\"color\":\"#E7664C\"},\"dimensions\":{\"x\":null,\"y\":[{\"accessor\":0,\"format\":{\"id\":\"number\"},\"params\":{},\"label\":\"Count\",\"aggType\":\"count\"}]}},\"aggs\":[{\"id\":\"1\",\"enabled\":true,\"type\":\"count\",\"schema\":\"metric\",\"params\":{}},{\"id\":\"2\",\"enabled\":true,\"type\":\"terms\",\"schema\":\"segment\",\"params\":{\"field\":\"convertedManaCost\",\"orderBy\":\"1\",\"order\":\"desc\",\"size\":20,\"otherBucket\":false,\"otherBucketLabel\":\"Other\",\"missingBucket\":false,\"missingBucketLabel\":\"Missing\"}}]}`,
            "uiStateJSON": "{}",
            "description": "",
            "version": 1,
            "kibanaSavedObjectMeta": {
                "searchSourceJSON": "{\"indexRefName\":\"kibanaSavedObjectMeta.searchSourceJSON.index\"}"
            }
        },
        "references": [
            { "name": "kibanaSavedObjectMeta.searchSourceJSON.index", "type": "index-pattern", "id": indexId }
        ]
    }
};

// builds CMC HeatMap body
let kibanaVisCMCHeatMapBody = function (indexId) {
    const title = kibanaVisTitle['CMCHeatMap'];
    return {
        "attributes": {
            "title": title,
            "visState": `{\"${title}\":\"CMC of Deck by Colors\",\"type\":\"heatmap\",\"params\":{\"addLegend\":true,\"addTooltip\":true,\"colorSchema\":\"Greens\",\"colorsNumber\":10,\"colorsRange\":[],\"dimensions\":{\"x\":{\"accessor\":0,\"format\":{\"id\":\"terms\",\"params\":{\"id\":\"number\",\"otherBucketLabel\":\"Other\",\"missingBucketLabel\":\"Missing\",\"parsedUrl\":{\"origin\":\"${kibanaURL}\",\"pathname\":\"/app/kibana\",\"basePath\":\"\"}}},\"params\":{},\"label\":\"convertedManaCost: Ascending\",\"aggType\":\"terms\"},\"y\":[{\"accessor\":2,\"format\":{\"id\":\"number\"},\"params\":{},\"label\":\"Count\",\"aggType\":\"count\"}],\"series\":[{\"accessor\":1,\"format\":{\"id\":\"terms\",\"params\":{\"id\":\"string\",\"otherBucketLabel\":\"Other\",\"missingBucketLabel\":\"Missing\",\"parsedUrl\":{\"origin\":\"${kibanaURL}\",\"pathname\":\"/app/kibana\",\"basePath\":\"\"}}},\"params\":{},\"label\":\"colors.keyword: Descending\",\"aggType\":\"terms\"}]},\"enableHover\":false,\"invertColors\":false,\"legendPosition\":\"right\",\"percentageMode\":false,\"setColorRange\":false,\"times\":[],\"type\":\"heatmap\",\"valueAxes\":[{\"id\":\"ValueAxis-1\",\"labels\":{\"color\":\"black\",\"overwriteColor\":false,\"rotate\":0,\"show\":false},\"scale\":{\"defaultYExtents\":false,\"type\":\"linear\"},\"show\":false,\"type\":\"value\"}]},\"aggs\":[{\"id\":\"1\",\"enabled\":true,\"type\":\"count\",\"schema\":\"metric\",\"params\":{}},{\"id\":\"2\",\"enabled\":true,\"type\":\"terms\",\"schema\":\"segment\",\"params\":{\"field\":\"convertedManaCost\",\"orderBy\":\"_key\",\"order\":\"asc\",\"size\":20,\"otherBucket\":false,\"otherBucketLabel\":\"Other\",\"missingBucket\":false,\"missingBucketLabel\":\"Missing\"}},{\"id\":\"3\",\"enabled\":true,\"type\":\"terms\",\"schema\":\"group\",\"params\":{\"field\":\"colors.keyword\",\"orderBy\":\"1\",\"order\":\"desc\",\"size\":5,\"otherBucket\":false,\"otherBucketLabel\":\"Other\",\"missingBucket\":false,\"missingBucketLabel\":\"Missing\"}}]}`,
            "uiStateJSON": "{}",
            "description": "",
            "version": 1,
            "kibanaSavedObjectMeta": {
                "searchSourceJSON": "{\"indexRefName\":\"kibanaSavedObjectMeta.searchSourceJSON.index\"}"
            }
        },
        "references": [
            { "name": "kibanaSavedObjectMeta.searchSourceJSON.index", "type": "index-pattern", "id": indexId }
        ]
    }
};

// builds card type body
let kibanaVisCardTypeBody = function (indexId) {
    const title = kibanaVisTitle['CardTypeBar'];
    return {
        "attributes": {
            "title": title,
            "visState": `{\"title\":\"${title}\",\"type\":\"pie\",\"params\":{\"type\":\"pie\",\"addTooltip\":true,\"addLegend\":true,\"legendPosition\":\"right\",\"isDonut\":true,\"labels\":{\"show\":false,\"values\":true,\"last_level\":true,\"truncate\":100},\"dimensions\":{\"metric\":{\"accessor\":1,\"format\":{\"id\":\"number\"},\"params\":{},\"label\":\"Count\",\"aggType\":\"count\"},\"buckets\":[{\"accessor\":0,\"format\":{\"id\":\"terms\",\"params\":{\"id\":\"string\",\"otherBucketLabel\":\"Other\",\"missingBucketLabel\":\"Missing\",\"parsedUrl\":{\"origin\":\"${kibanaURL}\",\"pathname\":\"/app/kibana\",\"basePath\":\"\"}}},\"params\":{},\"label\":\"type.keyword: Descending\",\"aggType\":\"terms\"}]}},\"aggs\":[{\"id\":\"1\",\"enabled\":true,\"type\":\"count\",\"schema\":\"metric\",\"params\":{}},{\"id\":\"2\",\"enabled\":true,\"type\":\"terms\",\"schema\":\"segment\",\"params\":{\"field\":\"types.keyword\",\"orderBy\":\"1\",\"order\":\"desc\",\"size\":10,\"otherBucket\":false,\"otherBucketLabel\":\"Other\",\"missingBucket\":false,\"missingBucketLabel\":\"Missing\"}}]}`,
            "uiStateJSON": "{}",
            "description": "",
            "version": 1,
            "kibanaSavedObjectMeta": {
                "searchSourceJSON": "{\"indexRefName\":\"kibanaSavedObjectMeta.searchSourceJSON.index\"}"
            }
        },
        "references": [
            { "name": "kibanaSavedObjectMeta.searchSourceJSON.index", "type": "index-pattern", "id": indexId }
        ]
    }
};

// dictionary of visualization options
const kibanaVis = {
    "CMC": kibanaVisCMCBody,
    "CMCHeatMap": kibanaVisCMCHeatMapBody,
    "CardTypeBar": kibanaVisCardTypeBody
};

// check if visualizations exists
let existsVisualization = function (callback, indexId, visList) {
    // has reference object for kibana find
    const hasRef = JSON.stringify({ type: "index-pattern", id: indexId });

    const findCallback = function (err, response) {
        // get list of visualizations
        const visualizations = response.saved_objects;
        const retArr = {};

        // for each one try to find the corresponding one
        visList.forEach(findVis => {
            const find = visualizations.find(vis => vis.attributes.title === kibanaVisTitle[findVis]);
            // if exists then fill dictionary
            retArr[findVis] = find;
        });
        callback(err, retArr);
    };
    kibanaFind(findCallback, ["title", "type", "references"], "visualization", null, null, hasRef);
};

// builds visualization
let makeVisualization = function (visBody, callback) {
    const options = {
        uri: kibanaURL + '/api/saved_objects/visualization?overwrite=true',
        body: JSON.stringify(visBody),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'kbn-xsrf': 'anything'
        }
    };
    request(options, (err, response) => callback(err, response));
};

let getVisEmbedUrl = function (visId) {
    if (process.env.NODE_ENV === 'production') {
        return `https://mintcard.me/app/kibana#/visualize/edit/${visId}?embed=true`;
    }
    return `${kibanaURL}/app/kibana#/visualize/edit/${visId}?embed=true`;
};

// processes requested visualizations and sends embeded iframe url back to response
app.post('/api/kibana/visualize/', [
    insureIndexPattern,
    body('patterns').isArray(),
    isFormatted
], function (req, res, next) {
    // get patterns requested
    const patterns = req.body.patterns;
    // get index pattern id from insure
    const indexPatternId = req.session.indexPatternId;
    // prep session variable for cleanup
    req.session.kibanaVis = req.session.kibanaVis ? req.session.kibanaVis : {};

    // check which visualizations already exist
    const existsCallback = function (err, response) {
        const buildArr = [];
        const urls = {};

        // go through and add missing to build array and existing to urls
        patterns.forEach(pattern => {
            if (response[pattern]) {
                urls[pattern] = getVisEmbedUrl(response[pattern].id);
            } else {
                buildArr.push(pattern);
            }
        });

        // nothing to build then return urls
        if (buildArr.length === 0) {
            res.json(urls);
        } else {
            let complete = 0;
            const finished = buildArr.length;

            buildArr.forEach(pattern => makeVisualization(kibanaVis[pattern](indexPatternId),
                function (err, buildResponse) {
                    if (buildResponse && buildResponse.statusCode > 199 && buildResponse.statusCode < 300) {
                        // good response so save in urls and recurse
                        const body = JSON.parse(buildResponse.body);
                        urls[pattern] = getVisEmbedUrl(body.id);

                        complete++;
                        if (complete === finished) {
                            res.json(urls);
                        }
                    } else {
                        complete = finished;
                        res.status(500).end();
                    }
                }));
        }
    };
    // start check of existing
    existsVisualization(existsCallback, indexPatternId, patterns);
});


// CLEANUP FOR KIBANA AND ELASTIC DYNAMIC *************

// removes user index from elastic
app.delete('/api/elastic', [
    isAuthenticated,
], function (req, res, next) {
    const indexName = getUserElasticIndex(req.session.username);
    elasticClient.indices.delete({ index: indexName })
        .catch(err => { return res.status(500).end() })
        .then(response => {
            req.session.visualizationUserOn = false;
            return res.json({ complete: true });
        });
});

// helper to handle Delete call for kibana
let kibanaRemove = function (callback, type, id) {
    const options = {
        uri: kibanaURL + `/api/saved_objects/${type}/${id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'kbn-xsrf': 'anything'
        }
    };
    request(options, (err, response) => callback(err, response));
};

// removes index-pattern and visualizations
app.delete('/api/kibana', [
    isAuthenticated
], function (req, res, next) {
    const indexName = getUserElasticIndex(req.session.username);
    const patterns = Object.keys(kibanaVis);
    let indexId = null;
    let complete = 0;
    let finished = 0;

    // callback to see if all deletions completed
    const checkFinishCallback = function (err, response) {
        if (response && response.statusCode > 199 && response.statusCode < 300) {
            complete++;
            // complete without errors so finish
            if (complete === finished) {
                res.json({ complete: true });
            }
        } else {
            complete = finished;
            res.status(500).end();
        }
    };

    // callback to run once index is found
    const visualizationCallback = function (err, response) {
        if (err) {
            res.status(500).end();
        }

        // load existing visualizations into array for deletion
        const visualizationIds = [];
        patterns.forEach(pattern => {
            if (response[pattern]) {
                finished++;
                visualizationIds.push(response[pattern].id);
            }
        });

        // try to remove index-pattern and visualizations
        req.session.indexPatternId = null;
        kibanaRemove(checkFinishCallback, 'index-pattern', indexId);
        visualizationIds.forEach(id => kibanaRemove(checkFinishCallback, 'visualization', id));
    };

    // callback that handles getting index-pattern
    const indexPatternCallback = function (err, response) {
        if (err) {
            res.status(500).end();
        }

        // checks if pattern exists
        let responseIndexId = null;
        if (response.total > 0) {
            responseIndexId = response.saved_objects[0].id;
            finished++;
        }

        // indexId from either gotten or from session
        indexId = req.session.indexPatternId ? req.session.indexPatternId : responseIndexId;

        // if indexId then we check for visualizations, o/w we delete the indexPattern and end
        if (indexId) {
            existsVisualization(visualizationCallback, indexId, patterns);
        } else {
            kibanaRemove(checkFinishCallback, 'index-pattern', indexId);
            res.json({ complete: true });
        }
    };

    // runs the find index pattern
    getIndexPattern(indexName, indexPatternCallback);
});

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./SQL/mint-card.sqlite', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the mint-card database.');
//     console.log('running db initialization....');
//     console.log('db initialization complete.');
// });

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signup/
app.post('/api/signup/', [
    body('username', 'username must not be empty').notEmpty().isAlphanumeric(),
    body('password', 'password must not be empty').notEmpty().isAlphanumeric(),
    isFormatted
], function (req, res, next) {
    if(req.body.password.length < 8) {
        return res.status(422).end();
    }
    let username = req.body.username;
    let password = req.body.password;
    // db.all("select * from users where username = ?", [username], function(err, data) {
    //     if (err) return res.status(500).end(err);
    //     if (data.length > 0) return res.status(409).end("username " + username + " already exists");
    //     let salt = generateSalt();
    //     let hash = generateHash(password, salt);
    //     db.all("insert into users (username, salt, hash) values (?, ?, ?)", [username, salt, hash], function(err, data) {
    //         if (err) return res.status(500).end(err);
    //         return res.json("user " + username + " signed up");
    //     });
    // });
    db.any('select * from "C09"."Users" where username = $1', [username]
    ).then(function (data) {
        if (data.length > 0) return res.status(409).end("username " + username + " already exists");
        let salt = generateSalt();
        let hash = generateHash(password, salt);
        db.none('insert into "C09"."Users" (username, salt, hash) values ($1, $2, $3)', [username, salt, hash]
        ).then(function () {
            req.session.username = username;
            res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
            }));
            return res.json({ username: username });
        }).catch(function (err) {
            return res.status(500).end(err);
        });
    }).catch(function (err) {
        if (err) return res.status(500).end(err);
    });

});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/api/signin/', [
    body('username', 'username must not be empty').notEmpty().escape(),
    body('password', 'password must not be empty').notEmpty().escape(),
    isFormatted
], function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let username = req.body.username;
        let password = req.body.password;
        // db.all("select * from users where username = ?", [username], function(err, data) {
        //     if (err) return res.status(500).end(err);
        //     if (data.length !== 1) return res.status(401).end("access denied");
        //     if (data[0].hash !== generateHash(password, data[0].salt)) return res.status(401).end("access denied");
        //     req.session.username = username;
        //     res.setHeader('Set-Cookie', cookie.serialize('username', username, {
        //         path: '/',
        //         maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        //     }));
        //     return res.json("user " + username + " signed in");
        // });
        db.any('select * from "C09"."Users" where username = $1', [username]
        ).then(function (data) {
            if (data.length !== 1) return res.status(401).end("access denied");
            if (data[0].hash !== generateHash(password, data[0].salt)) return res.status(401).end("access denied");
            req.session.username = username;
            res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
            }));
            return res.json({ username: username });
        }).catch(function (err) {
            return res.status(500).end(err);
        });
    } else {
        return res.status(422).json(errors.array());
    }
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/api/signout/', function (req, res, next) {
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    res.setHeader('Content-Type', 'text/plain');
    res.end("LOGGED OUT");
});

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.crt');
const config = {
    key: privateKey,
    cert: certificate
};

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
