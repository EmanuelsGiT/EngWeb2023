# script para colocar _id em todos os elementos do dataset
# baseado no tpc teorico
# simaobarroso 22mar

import json
import time

f = open("dataset-extra1.json")
dataset = json.load(f)

i = 0 
for data in dataset['pessoas']:
    id = "p"+str(i)
    i += 1
    data["_id"] = id


fwrite = open("datasetAlterado.json","w")

json.dump(dataset,fwrite,indent = " ")