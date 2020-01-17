import sys
from os import listdir
from os.path import isfile, join

mypath = sys.argv[1];

onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

print(onlyfiles)
