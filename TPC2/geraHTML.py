import json
import icu

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
ligacoes = mapa['ligações']
distritos = dict()

for i in cidades:
    if i['distrito'] in distritos.keys():
        distritos[i['distrito']] += [(i['nome'],i['id'])]
    else:
        distritos.update({i['distrito'] : [i['nome'],i['id']]})

distritos = dict(sorted(distritos.items()))



pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title> TPC2 EngWeb </title>
        <meta charset="utf-8" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">

    </head>
    <body class="container bg-primary-subtle">
        <center>
            <h1> Mapa Virtual </h1>
        </center>
"""

for d in distritos:
    pagHTML += f"<h1>{d}</h1><ul>"
    for c in distritos[d]:
        pagHTML += f"<li><a href='{c[1]}'>{c[0]}</a></li>"
    pagHTML += "</ul>"                   

pagHTML += """ 
    </body>
</html>
"""

print(pagHTML)