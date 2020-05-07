from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re
import pandas as pd

data = pd.read_csv('cards.csv').set_index('uuid')
sentences = []
for index, row in data.iterrows():
    tokenized = word_tokenize(row['text'].lower())
    filtered = [word for word in tokenized if word not in stopwords.words('english')]
    sentences.append(TaggedDocument(
        words=word_tokenize(row['text']), tags=[index]))

model = Doc2Vec(documents=sentences, epochs=15)

tokens = word_tokenize("blue white absorb counter spell target gain 3 life instant".lower())
tokens = [word for word in tokens if word not in stopwords.words('english')]
new_vector = model.infer_vector(tokens)
sims = model.docvecs.most_similar([new_vector]) #gives you top 10 document tags and their cosine similarity
print(sims)
