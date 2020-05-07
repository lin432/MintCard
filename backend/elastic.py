import json
import chardet
import elasticsearch

es = elasticsearch.Elasticsearch()

fileName = 'standardCardsList.json'


# Fix for json file encoding issues
# https://stackoverflow.com/questions/28171696/python-json-to-csv-bad-encoding-unicodedecodeerror-charmap-codec-cant-dec

print('Opening File')
enc = chardet.detect(open(fileName,'rb').read())['encoding']

with open(fileName, 'r', encoding = enc) as f:
    data = json.load(f)

print('Deleting old index')
es.indices.delete(index='cards', ignore=[400, 404])

i = 1
for item in data:
    _id = i
    print('Adding card: ' + str(i))
    es.index(index='cards', id=_id, body=item)

    i = i + 1

print('DONE')
