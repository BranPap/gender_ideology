import json
import pandas as pd
import random

states = ["California","Alabama","Alaska","Arizona","Arkansas","Connecticut","Colorado","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]

random.shuffle(states)

df = pd.read_csv(r"/Users/branpap/Desktop/gender_processing/experiments/3_Production/experiment/stimuli_creation/prod_lexemes.csv")

entries = []

entry_keys = []

for index,row in df.iterrows():
    if row["lexeme"] not in entry_keys:
        final_dict = dict()
        final_dict["lexeme"] = row["lexeme"]
        final_dict["type"] = row["type"]
        final_dict["sentence"] = row["sentence"]
        options = []
        options.append(row["opt1"])
        options.append(row["opt2"])
        options.append(row["opt3"])
        final_dict["options"] = options
        entry_keys.append(row["lexeme"])
        entries.append(final_dict)

with open(r'/Users/branpap/Desktop/gender_processing/experiments/3_Production/experiment/stimuli_creation/prod_stims_test.js', 'w') as stimlist:
    s = json.dumps(entries, indent=4)
    stimlist.write("var all_stims = ")
    stimlist.write(s)
