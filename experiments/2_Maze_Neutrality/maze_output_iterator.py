import pandas as pd
import string
import glob
import os

os.chdir("experiment/stimuli_creation/to-merge")

extension = 'csv'

all_filenames = [i for i in glob.glob('*.{}'.format(extension))]

combined_file = pd.concat(pd.read_csv(f) for f in all_filenames)

combined_file.to_csv("combined_file.csv",index=False,encoding='utf-8-sig')
