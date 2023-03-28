import json
import time
import requests

# link da api da aplicacao de dados
api = "http://localhost:3000/pessoas/" # tal como o json server (nome colecao)

f = open("./datasets/datasetAlterado.json") # ou datasets/datasetAlterado.json
dataset = json.load(f)

for data in dataset['pessoas']:
    id = data["_id"]
    getId = requests.get(api + id) 
    if getId.text != "null": # entra neste caso se o id  esteja na base de dados (ou seja, é para eliminar)
        delete = requests.delete(api + id)
        print(delete) # imprime o codigo da resposta