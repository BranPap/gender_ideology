import json
import pandas as pd

df = pd.read_csv('to-merge/maze_csv.csv')

stim_list = ['actor', 'actor', 'actor', 'actress', 'anchor', 'anchor', 'anchorman', 'anchorwoman', 'flight attendant', 'flight attendant', 'steward', 'stewardess', 'businessperson', 'businessperson', 'businessman', 'businesswoman', 'camera operator', 'camera operator', 'cameraman', 'camerawoman', 'congressperson', 'congressperson', 'congressman', 'congresswoman', 'craftsperson', 'craftsperson', 'craftsman', 'craftswoman', 'crewmember', 'crewmember', 'crewman', 'crewwoman', 'firefighter', 'firefighter', 'fireman', 'firewoman', 'foreperson', 'foreperson', 'foreman', 'forewoman', 'heir', 'heir', 'heir', 'heiress', 'hero', 'hero', 'hero', 'heroine', 'host', 'host', 'host', 'hostess', 'hunter', 'hunter', 'hunter', 'huntress', 'layperson', 'layperson', 'layman', 'laywoman', 'police officer', 'police officer', 'policeman', 'policewoman', 'salesperson', 'salesperson', 'salesman', 'saleswoman', 'stunt double', 'stunt double', 'stuntman', 'stuntwoman', 'villain', 'villain', 'villain', 'villainess', 'meteorologist', 'meteorologist', 'weatherman', 'weatherwoman']

sentence_units = ["name","be","det","target","prep","state","pro","like","activity"]

entries = []

entry_keys = []

for index,row in df.iterrows():
    words = []
    lexeme_name = row["lexeme"]
    if row["lexeme"] not in entry_keys:
        final_dict = dict()
        final_dict["lexeme"] = row["lexeme"]
        con_list = []
        mini_dict = dict()
        final_dict["condition"] = con_list
        con_list.append(mini_dict)
        entry_keys.append(row["lexeme"])
    if row["condition"] not in final_dict["condition"][0].values():
        feature_condition = row["condition"]
        feature_list = []
        tiny_dict = dict()
        tiny_dict["id"] = row["id"]
        tiny_dict["gender"] = row["gender"]
        tiny_dict["orthog"] = row["orthog"]
        tiny_dict["question1"] = row["question1"]
        tiny_dict["answer1"] = row["answer1"]
        tiny_dict["question2"] = row["question2"]
        tiny_dict["answer2"] = row["answer2"]
        tiny_dict["condition"] = row["condition"]
        tiny_dict["lexeme"] = row["lexeme"]
        for term in sentence_units:
            d = dict()
            d["form"] = row[term]
            d["distractor"] = row[term+"_m2"]
            if row[term] in stim_list:
                d["region"] = "critical"
            else:
                d["region"] = "none"
            words.append(d)
        tiny_dict["words"] = words
        feature_list.append(tiny_dict)
        mini_dict[feature_condition] = feature_list
    if len(final_dict["condition"][0]) == 4:
        entries.append(final_dict)

print(entries)

with open('stimuli_creation/reading_stims.js', 'w') as stimlist:
    s = json.dumps(entries, indent=4)
    stimlist.write("var all_stims = ")
    stimlist.write(s)
