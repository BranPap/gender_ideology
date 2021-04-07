import json
import pandas as pd

df = pd.read_csv('stims.csv')

sentence_units = ["name","be","det","target","prep","state","pro","like","activity"]

entries = []

for index,row in df.iterrows():
    sentence = dict()
    words = []
    for term in sentence_units:
        d = dict()
        d["form"] = row[term]
        words.append(d)
    sentence["words"] = words
    sentence["question1"] = row["question1"]
    sentence["answer1"] = row["answer1"]
    sentence["question2"] = row["question2"]
    sentence["answer2"] = row["answer2"]
    sentence["gender"] = row["gender"]
    sentence["lexeme"] = row["lexeme"]
    sentence["orthog"] = row["orthog"]
    entries.append(sentence)

with open('stims.json', 'w') as stimlist:
    s = json.dumps(entries, indent=4)
    stimlist.write(s)


# with open('stims.csv', 'r') as stimlist:
#     for line in stimlist:
#         line_split = line.split(',')
#         print line_split
