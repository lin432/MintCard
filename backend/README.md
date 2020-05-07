# API Documentation Below

## Deck API

### Create Deck
- description: Create a new deck
- request: `POST /api/deck/`
    - content-type: `application/json`
    - body: object
      - name: (string) the username
      - description: (string) the password
      - cards: (string[]) the cards in the deck by cardId
- response: 200
    - content-type: `application/json`
    - body: object
      - id: (string) the newly created deck's id
      - name: (string) name of the deck
      - description: (string) description of the deck
      - cards: (string[]) card id in deck
      - owner: (string) id of the deck owner

```
$ curl -X POST 
       -d '{"name": "Deck1", "description":"A Test Deck", "cards": [1,2,3,4,5]}'
       https://localhost:3000/api/deck/
```

### Read Deck
- description: Read a series of decks from the database
- request: `GET /api/deck/[?ownerId="userId"][?top=10][?page=1]`
- response: 200
    - content-type: `application/json`
    - body: object[]
      - id: (string) the deck's id
      - name: (string) name of the deck
      - description: (string) description of the deck
      - cards: (string[]) card id in deck
      - owner: (string) id of the deck owner

```
$ curl -X GET https://localhost:3000/api/deck/?ownerId="bob"&top=10&page=1
```

### Update Deck
- description: update an existing deck
- request: `PATCH /api/deck/:deckId/`
    - content-type: `application/json`
    - body: object
      - name: (string) the username
      - description: (string) the password
      - cards: (string[]) the cards in the deck by cardId
- response: 200
    - content-type: `application/json`
    - body: object
      - id: (string) the deck's id
      - name: (string) name of the deck after patch
      - description: (string) description of the deck after patch
      - cards: (string[]) card ids in deck after patch
      - owner: (string) id of the deck owner

```
$ curl -X PATCH 
       -d '{"name": "Deck1", "description":"A Patched Deck", "cards": [1,4,5]}'
       https://localhost:3000/api/deck/14AsrewqA4/
```
 
### Delete Deck
- description: update an existing deck
- request: `DELETE /api/deck/:deckId/`
- response: 200
    - content-type: `application/json`
    - body: object
      - id: (string) the deleted deck's id

```
$ curl -X DELETE
       https://localhost:3000/api/deck/14AsrewqA4/
```

### Get a card
- description: get a card given an id
- request: `GET /api/card/:cardId/`
- response: 200
    - content-type: `application/json`
    - body: object
        - {"cardId": (number), "data": (mtg card object)} 
```
$ curl localhost:3000/api/card/2 
```

### Get the url of the card image stored on an aws cdn
- description: get a image url given an id
- request: `GET /api/card/image/:imageId`
- response: 200
    - content-type: `application/json`
    - body: object
        - {"imageURL": (string)} 
```
$ curl localhost:3000/api/card/image/1000
```

### Get the urls of multiple card images stored on an aws cdn
- description: get a image url given an id
- request: `GET /api/card/image/byIds?cardIds[]=cardId`
- response: 200
    - content-type: `application/json`
    - body: object
        - [
            {
                "imageURL": (string)
                "cardId": (string)
            }
        ] 
```
$ curl localhost:3000/api/card/image/byIds?cardIds[]=1&cardIds[]=2&cardIds[]=5
```

### Get cards advanced
- description: get a card given advanced properties
- request: `POST /api/card/advanced/`
    - content-type: `application/json`
    - body: object
        - { "colors": (string[]),
            "name": string,
            "subtypes": (string[]),
            "type": string,
            "supertypes": (string[]),
            "types": (string[]),
            "uuid": string
           }
- response: 200
    - content-type: `application/json`
    - body: object
        - [{"cardId": (number), "data": (mtg card object)}]
```
curl -H "Content-Type: application/json" -X POST -d '{"type":"Instant", "colors": ["U", "W"]}' localhost:3000/api/card/advanced/
```
        
### Search for card using a sentence
- description: api gets a string sentence and parses it to retrieve most likely card
- request: `POST /api/card/ml/`
    - content-type: `application/json`
    - body: object
        - { "text": string }
- response: 200
    - content-type: `application/json`
    - body: object
         - [{"cardId": (number), "data": (mtg card object)}]
 ```
 curl -H "Content-Type: application/json" -X POST -d '{"text":"Card that is type instant, casting uses 1 blue and 1 white."}' localhost:3000/api/card/ml/
 ```

### Signup api
- description: Signs a new user up
- request: `POST /api/signup/`
    - content-type: `application/json`
    - body: object
        - { "username": string, "password": string }
- response: 200
    - content-type: `application/json`
    - body: object
         - [{"username": string}]
 ```
 curl -H "Content-Type: application/json" -X POST -d '{"username":"user1", "password": "secret"}' localhost:3000/api/signup/
 ```

### Signin api
- description: Signs the user into the app
- request: `POST /api/signup/`
    - content-type: `application/json`
    - body: object
        - { "username": string, "password": string }
- response: 200
    - content-type: `application/json`
    - body: object
         - [{"username": string}]
 ```
 curl -H "Content-Type: application/json" -X POST -d '{"username":"user1", "password": "secret"}' localhost:3000/api/sign/
 ```

### Signin api
- description: Signs the user out of the
- request: `GET /api/signout/`
- response: 200
    - content-type: `application/json`
    - body: object
         - [{"username": string}]
 ```
 curl localhost:3000/api/signout/
 ```
### Get card properties from list of cards
- description: get cards by ids
- request: `GET /api/card/byIds/`
    - content-type: `application/json`
    - body: object
        - { "cards": string[] }
- response: 200
    - content-type: `application/json`
    - body: object
        - [
            {"cardId": (number), "data": (mtg card object)} 
          ]
```
$ curl -X GET 
       -d '{"cards": [15,16,17,18,19,1,4,5]}'
       https://localhost:3000/api/card/byIds/
```

### search the elasticSearch index for cards based on text
- description: search the elasticSearch index for cards based on text
- request: `POST /api/elastic/card/`
    - content-type: `application/json`
    - body: object
        - { "text": string }
- response: 200
    - content-type: `application/json`
    - body: object
        - [
            {
                "_index": string,
                "_type": string,
                "_id": string,
                "_score": string,
                "_source": (mtg card object),
            }
          ]
```
$ curl -X POST 
       -d '{"cards": [15,16,17,18,19,1,4,5]}'
       https://localhost:3000/api/elastic/load/
```

### Load a list of cards and properties into elasticSearch, required for KIBANA visualizations
- description: load deck cards into user elasticsearch index
- request: `POST /api/elastic/load/`
    - content-type: `application/json`
    - body: object
        - { "cards": string[] }
- response: 200
    - content-type: `application/json`
    - body { "complete": boolean }
```
$ curl -X POST 
       -d '{"cards": [15,16,17,18,19,1,4,5]}'
       https://localhost:3000/api/elastic/load/
```

### Create a series of kibana visualizations on server and get embedded urls
- description: create visualizations based on user elasticsearch index
- request: `POST /api/kibana/visualize/`
    - content-type: `application/json`
    - body: object
        - { "patterns": ["CMC", "CMCHeatMap", "CardTypeBar"] }
- response: 200
    - content-type: `application/json`
    - body: object
        - { 
            "CMC": string, 
            "CMCHeatMap": string, 
            "CardTypeBar": string
          }
```
$ curl -X GET 
       -d '{ "patterns": ["CMCHeatMap", "CardTypeBar"] }'
       https://localhost:3000/api/kibana/visualize/
```

### Delete user elastic index
- description: Deletes all elasticsearch resources owned by user
- request: `DELETE /api/elastic`
- response: 200
    - content-type: `application/json`
    - body { "complete": boolean }
```
$ curl -X DELETE https://localhost:3000/api/elastic/
```

### Load a list of cards and properties into elasticSearch, required for KIBANA visualizations
- description: Deletes all kibana resources owned by user
- request: `DELETE /api/kibana`
- response: 200
    - content-type: `application/json`
    - body { "complete": boolean }
```
$ curl -X DELETE https://localhost:3000/api/kibana/
```
