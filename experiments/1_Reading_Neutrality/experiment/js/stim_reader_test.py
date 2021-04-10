import json
import pandas as pd

df = pd.read_csv('js/test_stims.csv')

sentence_units = ["name","be","det","target","prep","state","pro","like","activity"]

entries = []

final_dict = dict()
### Dictionary to contain all stimuli

for index,row in df.iterrows():
    words = []
    if row["lexeme"] not in final_dict.keys():
    # if the lexeme is not in the final dictionary, create that lexeme as a key
        entry = row["lexeme"]
        final_dict[entry] = []
    if row["condition"] not in final_dict[entry]:
    # if the condition is not in the list of sub_entries, then instantiate it as such, as a key
        condition_name = row["condition"]
        mini_list = []
        mini_dic = {}
        mini_dic["question1"] = row["question1"]
        mini_dic["answer1"] = row["answer1"]
        mini_dic["question2"] = row["question2"]
        mini_dic["answer2"] = row["answer2"]
        mini_dic["gender"] = row["gender"]
        mini_dic["orthog"] = row["orthog"]
        mini_dic["id"] = row["id"]
        mini_list.append(mini_dic)
        sub_entry = {condition_name : mini_list}
    for term in sentence_units:
        d = dict()
        d["form"] = row[term]
        words.append(d)
    mini_dic["words"] = words
    final_dict[entry].append(sub_entry)

entries.append(final_dict)



    # lexeme["question1"] = row["question1"]
    # lexeme["answer1"] = row["answer1"]
    # lexeme["question2"] = row["question2"]
    # lexeme["answer2"] = row["answer2"]
    # lexeme["gender"] = row["gender"]
    # lexeme["orthog"] = row["orthog"]
    # lexeme["id"] = row["id"]


with open('js/test_stims.json', 'w') as stimlist:
    s = json.dumps(entries, indent=4)
    stimlist.write(s)
