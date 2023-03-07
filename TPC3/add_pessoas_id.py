#import json
#
#f = open("dataset_extra1.json","r")
#pessoas = json.load(f)
#f.close()
#for index, p in enumerate(pessoas['pessoas']):
#    p['id'] = "p" + str(index)
#
#f = open("dataset_extra1.json","w")
#json.dump(pessoas,f)
#f.close()

import json

with open("dataset-extra1.json", "r") as file:
    data = json.load(file)
    i = 0
    
    for d in data['pessoas']:
        d['id'] = "p" + str(i)
        i+=1
        
    
    with open("dataset-extra1.json", "w") as file:
        json.dump(data,file)