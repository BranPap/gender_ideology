import os
import re

blackout = " @ @ @ @ @ @ @ @ @ @ "

input_directory = r"C:\Users\Unarm\onedrive\Desktop\COCA\COCA_Text\text_spoken_kde"

i = 1

for entry in os.scandir(input_directory):
    if (entry.path.endswith("spok.txt")):
        with open(entry) as input:
            with open(r"C:\Users\Unarm\onedrive\Desktop\COCA\COCA_Text\intermediate\{}output.txt".format(str(i)),'w') as output:
                for line in input:
                    test = re.split('\!|\?|\.',line)
                    for item in test:
                        output.write(item)
                        output.write('\n')
        i+=1

output_directory = r"C:\Users\Unarm\onedrive\Desktop\COCA\COCA_Text\intermediate"

i = 1

tf_placeholder = re.compile("[A-Z']+\s[A-Z']*\s*\(+[\sA-Z\-\']*\s\)*", re.MULTILINE);



for entry in os.scandir(output_directory):
    with open(entry, "r+") as file:
        with open(r"C:\Users\Unarm\onedrive\Desktop\COCA\COCA_Text\final_redos\{}output_final.txt".format(str(i)),'w') as output:
            lines = file.readlines()
            for line in lines:
                 if line !=" @\n" and line != "\n" and blackout not in line:
                    line = line.replace(" ,",",")
                    line = re.sub("[A-Z']+-[A-Z']+#","",line)
                    line = re.sub("[A-Z]+#","",line)
                    line = re.sub("[A-Z']+\s[A-Z']+#","",line)
                    line = re.sub(tf_placeholder,"",line)
                    line = re.sub("@@[1-9]*","",line)
                    line = re.sub("@\(.*\)","",line)
                    line = re.sub("\" ","",line)
                    line = re.sub(" \'s","\'s",line)
                    line = re.sub(" \'S","\'S",line)
                    line = re.sub(" \'m","\'m",line)
                    line = re.sub("gon na", "gonna",line)
                    line = re.sub(" n\'t", "n\'t",line)
                    line = re.sub(" \'ve", "\'ve",line)
                    line = re.sub(" \'ll", "\'ll",line)
                    line = re.sub(" \'re", "\'re",line)
                    line = re.sub("\' til", "\'til",line)
                    line = re.sub(" \'d", "\'d",line)
                    line = re.sub("\' cause","\'cause",line)
                    line = re.sub("\' Cause","\'Cause",line)
                    line = re.sub("[A-Z1-9\-\s\'\(\),]+[#:]+", "",line)
                    line = line.strip(" ")
                    if line != "\n" and line != "@\n":
                        output.write(line)
        i+=1

# with open("test.txt","r+") as final:
#     with open("output.txt",'w') as new_final:
#         lines = final.readlines()
#         for line in lines:
#             if line !=" @\n" and line != "\n":
#                 line = line.replace(" ,",",")
#                 line = re.sub("[A-Z]+-[A-Z]+#","",line)
#                 line = re.sub("@@[1-9]*","",line)
#                 line = re.sub("@\(.*\)","",line)
#                 # print(line)
#                 new_final.write(line)
