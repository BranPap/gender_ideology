import json
import pandas as pd

df = pd.read_csv('js/test_stims.csv')

sentence_units = ["name","be","det","target","prep","state","pro","like","activity"]

entries = []
final_dict = dict()

for index,row in df.iterrows():
    words = []
    if row["lexeme"] not in final_dict.values():
        final_dict["lexeme"] = row["lexeme"]
        con_list = []
        mini_dict = dict()
        final_dict["condition"] = con_list
        con_list.append(mini_dict)
    if row["condition"] not in final_dict["condition"][0].values():
        feature_condition = row["condition"]
        feature_list = []
        tiny_dict = dict()
        tiny_dict["id"] = row["id"]
        tiny_dict["gender"] = row["gender"]
        tiny_dict["orthog"] = row["orthog"]
        tiny_dict["id"] = row["id"]
        for term in sentence_units:
            d = dict()
            d["form"] = row[term]
            words.append(d)
        tiny_dict["words"] = words
        feature_list.append(tiny_dict)
        mini_dict[feature_condition] = feature_list

entries.append(final_dict)

print(entries)

with open('js/final_stim_test.json', 'w') as stimlist:
    s = json.dumps(entries, indent=4)
    stimlist.write(s)
