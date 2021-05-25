import json
import pandas as pd
import random

df = pd.read_csv("experiment\stimuli_creation\maze_lexemes.csv")

states = ["California","Alabama","Alaska","Arizona","Arkansas","Connecticut","Colorado","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]

random.shuffle(states)

activities = ["swimming","writing","singing","dancing","hiking","running","reading","drawing","painting","cooking","cycling","walking","studying","surfing","camping"]

random.shuffle(activities)

stim_list = []

coin = [0,1]

entry = []
status = 1

with open("experiment\stimuli_creation\maze_stims.csv", 'w') as stim_input:
    stim_input.write("name,be,det,target,prep,state,pro,like,activity,question1,answer1,question2,answer2,gender,lexeme,orthog,condition,id")
    stim_input.write("\n")
    for index,row in df.iterrows():
        status +=1
        state = states.pop()
        activity = random.choice(activities)
        antistate = random.choice(states)
        activity_2 = random.choice(activities)
        stim_input.write("NAME,is,")
        stim_input.write(row["det"])
        stim_input.write("," + row["neutral"])
        stim_input.write(",from,")
        stim_input.write(state+".")
        stim_input.write(",She,")
        stim_input.write("likes,")
        stim_input.write(activity+".")
        entry.append(str(('female;'+str(status)+';Jane is '+row["det"]+" "+row["neutral"]+" from "+state+". She likes "+activity+".")))
        activity_chance = random.choice(coin)
        if activity_chance == 0:
            stim_input.write(",Does NAME like "+activity_2+"?")
            if activity == activity_2:
                stim_input.write(",Yes")
            else:
                stim_input.write(",No")
        else:
            stim_input.write(",Does NAME like "+activity+"?")
            stim_input.write(",Yes")
        chance = random.choice(coin)
        if chance == 0:
            stim_input.write(",Is NAME from "+antistate+"?")
            stim_input.write(",No,")
        else:
            stim_input.write(",Is NAME from "+state+"?")
            stim_input.write(",Yes,")
        stim_input.write("female,"+row['lexeme']+','+row["female"]+',')
        stim_input.write("neutral_female"+',')
        stim_input.write(row['lexeme'])
        stim_input.write("_neutral_female")
        stim_input.write('\n')
        stim_input.write("NAME,is,")
        stim_input.write(row["det"])
        stim_input.write("," + row["female"])
        stim_input.write(",from,")
        stim_input.write(state+".")
        stim_input.write(",She,")
        stim_input.write("likes,")
        stim_input.write(activity+".")
        entry.append(str(('female;'+str(status)+';Jane is '+row["det"]+" "+row["female"]+" from "+state+". She likes "+activity+".")))
        if activity_chance == 0:
            stim_input.write(",Does NAME like "+activity_2+"?")
            if activity == activity_2:
                stim_input.write(",Yes")
            else:
                stim_input.write(",No")
        else:
            stim_input.write(",Does NAME like "+activity+"?")
            stim_input.write(",Yes")
        if chance == 0:
            stim_input.write(",Is NAME from "+antistate+"?")
            stim_input.write(",No,")
        else:
            stim_input.write(",Is NAME from "+state+"?")
            stim_input.write(",Yes,")
        stim_input.write("female,"+row['lexeme']+','+row["female"]+',')
        stim_input.write("congruent_female"+',')
        stim_input.write(row['lexeme'])
        stim_input.write("_congruent_female")
        stim_input.write('\n')
        stim_input.write("NAME,is,")
        stim_input.write(row["det"])
        stim_input.write("," + row["neutral"])
        stim_input.write(",from,")
        stim_input.write(state+".")
        stim_input.write(",He,")
        stim_input.write("likes,")
        stim_input.write(activity+".")
        entry.append(str(('male;'+str(status)+';John is '+row["det"]+" "+row["neutral"]+" from "+state+". He likes "+activity+".")))
        if activity_chance == 0:
            stim_input.write(",Does NAME like "+activity_2+"?")
            if activity == activity_2:
                stim_input.write(",Yes")
            else:
                stim_input.write(",No")
        else:
            stim_input.write(",Does NAME like "+activity+"?")
            stim_input.write(",Yes")
        if chance == 0:
            stim_input.write(",Is NAME from "+antistate+"?")
            stim_input.write(",No,")
        else:
            stim_input.write(",Is NAME from "+state+"?")
            stim_input.write(",Yes,")
        stim_input.write("male,"+row['lexeme']+','+row["male"]+',')
        stim_input.write("neutral_male"+',')
        stim_input.write(row["lexeme"]+"_neutral_male")
        stim_input.write('\n')
        stim_input.write("NAME,is,")
        stim_input.write(row["det"])
        stim_input.write("," + row["male"])
        stim_input.write(",from,")
        stim_input.write(state+".")
        stim_input.write(",He,")
        stim_input.write("likes,")
        stim_input.write(activity+".")
        entry.append(str(('male;'+str(status)+';John is '+row["det"]+" "+row["male"]+" from "+state+". She likes "+activity+".")))
        if activity_chance == 0:
            stim_input.write(",Does NAME like "+activity_2+"?")
            if activity == activity_2:
                stim_input.write(",Yes")
            else:
                stim_input.write(",No")
        else:
            stim_input.write(",Does NAME like "+activity+"?")
            stim_input.write(",Yes")
        if chance == 0:
            stim_input.write(",Is NAME from "+antistate+"?")
            stim_input.write(",No,")
        else:
            stim_input.write(",Is NAME from "+state+"?")
            stim_input.write(",Yes,")
        stim_input.write("male,"+row['lexeme']+','+row["male"]+',')
        stim_input.write("congruent_male"+',')
        stim_input.write(row['lexeme'])
        stim_input.write("_congruent_male")
        stim_input.write('\n')
        stim_list.append(row['lexeme'])
        stim_list.append(row['neutral'])
        stim_list.append(row['male'])
        stim_list.append(row['female'])

with open('list_file.txt', 'w') as stim_checker:
    stim_checker.write(str(stim_list))


with open('to-be-matched.txt', 'w') as match_list:
    for sentence in entry:
        match_list.write(str(sentence)+"\n")
