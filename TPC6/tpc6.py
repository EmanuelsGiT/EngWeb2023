# TPC6 - carregar dataset json no mongo db
# simaobarroso

import json
import time
import requests

# link da api da aplicacao de dados
api = "http://localhost:3000/pessoas/" # tal como o json server (nome colecao)

f = open("./datasets/datasetAlterado.json") # ou datasets/datasetAlterado.json

# returna o JSON object como um dicionario
dataset = json.load(f)

f.close()

for data in dataset['pessoas']:
    id = data["_id"]
    #data["partido_politico"]["_id"] = id
    #data["atributos"]["_id"] = id
    #data["morada"]["_id"] = id
    getId = requests.get(api + id) 
    if getId.text == "null": # entra neste caso se o id do nao esteja na base de dados
        post = requests.post(api,json=data) # para especificar se e` json (se nao nao sabia se era xml,json, plain txr, etc) ***
        print(post.text) # codigo do post (201 se sucesso)
    else : # o id esta na base de dados e vamos ter de ter um put para o atualizar
        put = requests.put(api + id, json=data)
        print(put.text) # imprime o codigo da resposta


"""
Notas de resolucao:
    Primeiro criou-se com um servidor express. Eliminou-se as views e partes desnecessarioas, uma vez que esta api era apenas para ser
    uma api.
    De seguida utilizei o Postman para testar as varias operacoes (o get ainda conseguia no browser, as restantes teve de ser no postman)
    Por ultimo foi fazer este ficheiro.
        Percorro todo o dataset dado e a cada elemento vejo se ele esta na Mongobd com um get. Se nao estiver adiciono com post, caso contrario atualizo com put.
        Do CRUD a unica que falta é o delete, mas facilmente era feita:
            requests.delete(api + id)
            Mas como o exercicio nao pede, nao utilizei. Mas experimentei com o postman e funcionou, logo essa funcionalidade da api esta implementada.
            Como vou testar constantemente, decidi tambem fazer uma funcao delete. 
            Logo todas as funcionalidades funcionam
        No entanto esta constante verificacao leva a uma lentidao do programa, mas tambem a sua correcao.
        Optei por fazer em python uma vez que assim aprendia uma nova maneira de mandar pedidos, uma vez que em javascript ja fizemos varias vezes com o axios.
        Tambem foi feito em js, mas nao com a mesma complexidade.
"""


"""
*** 
The data being sent is a dictionary object with nested data, which is represented as a JSON object.
 
By passing this dictionary object to the json parameter of the requests.post() method, the requests library automatically 
sets the Content-Type header to application/json and encodes the data as a JSON object before sending it in the request body.


"""



"""
pip install requests


tpc6.py     <--->    node server express (npm start) <=> API dados    <--> MongoDB

notas :
servidor express tem de estar a funcionar

"""