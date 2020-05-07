import json
import csv

with open('standardCardsList.json') as f:
    data = json.load(f)
    
output = []
for card in data:
    newCard = {}
    newCard['uuid'] = card['uuid']
    newCard['text'] = card['name']
    if 'text' in card:
        newCard['text'] += card['text'] + ' '
    newCard['text'] += ' '.join(card['types']) + ' '
    newCard['text'] += ' '.join(card['supertypes']) + ' '
    newCard['text'] += ' '.join(card['subtypes']) + ' '
    for item in card['rulings']:
        newCard['text'] += item['text'] + ' '
    if 'manaCost' in card and card['manaCost']:
        temp = card['manaCost'].replace('{', '').replace('}', '')
        if ('W' in temp):
            newCard['text'] += str(temp.count('W')) + ' ' + 'white '
        if ('G' in temp):
            newCard['text'] += str(temp.count('G')) + ' ' + 'green '
        if ('R' in temp):
            newCard['text'] += str(temp.count('R')) + ' ' + 'red '
        if ('U' in temp):
            newCard['text'] += str(temp.count('U')) + ' ' + 'blue '
        if ('B' in temp):
            newCard['text'] += str(temp.count('B')) + ' ' + 'black '
    output.append(newCard)

keys = output[0].keys()
with open('cards.csv', 'w', newline='') as o:
    writer = csv.DictWriter(o, fieldnames=keys)
    writer.writeheader()
    writer.writerows(output)
