import os
import re

directory = r"C:\Users\Unarm\Desktop\COCA\COCA_Text\text_spoken_kde"

with open("test.txt",'w') as final:
    for entry in os.scandir(directory):
        if (entry.path.endswith(".txt")):
            with open(entry) as input:
                for line in input:
                    test = re.split('\!|\?|\.',line)
                    for item in test:
                        final.write(item)
                        final.write('\n')

with open("test.txt","r+") as final:
    with open("output.txt",'w') as new_final:
        lines = final.readlines()
        for line in lines:
            if line !=" @\n" and line != "\n":
                line = line.replace(" ,",",")
                line = re.sub("[A-W]*#","",line)
                line = re.sub("[A-W]*-[A-W]*#","",line)
                line = re.sub("@@[1-9]*","",line)
                line = re.sub("@\(.*\)","",line)
                # print(line)
                new_final.write(line)
