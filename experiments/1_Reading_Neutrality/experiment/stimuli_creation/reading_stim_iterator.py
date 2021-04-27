import json
import pandas as pd

df = pd.read_csv('stimuli_creation/lexeme_stims.csv')

stim_list = ['congressperson', 'congressperson', 'congressman', 'congresswoman', 'actor', 'actor', 'actor', 'actress', 'firefighter', 'firefighter', 'fireman', 'firewoman', 'hunter', 'hunter', 'hunter', 'huntress', 'meteorologist', 'meteorologist', 'weatherman', 'weatherwoman', 'businessperson', 'businessperson', 'businessman', 'businesswoman', 'salesperson', 'salesperson', 'salesman', 'saleswoman', 'gentleperson', 'gentleperson', 'gentleman', 'gentlewoman', 'host', 'host', 'host', 'hostess', 'mail carrier', 'mail carrier', 'mailman', 'mailwoman', 'villain', 'villain', 'villain', 'villainess', 'police officer', 'police officer', 'policeman', 'policewoman', 'heir', 'heir', 'heir', 'heiress', 'restaurant server', 'restaurant server', 'waiter', 'waitress', 'usher', 'usher', 'usher', 'usherette', 'anchor', 'anchor', 'anchorman', 'anchorwoman', 'assemblyperson', 'assemblyperson', 'assemblyman', 'assemblywoman', 'layperson', 'layperson', 'layman', 'laywoman', 'stunt double', 'stunt double', 'stuntman', 'stuntwoman', 'craftsperson', 'craftsperson', 'craftsman', 'craftswoman', 'camera operator', 'camera operator', 'cameraman', 'camerawoman', 'fisher', 'fisher', 'fisherman', 'fisherwoman', 'hero', 'hero', 'hero', 'heroine']

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
