import json
import icu

def ordCidade(cidade):
    return cidade['nome']

collator = icu.Collator.createInstance(icu.Locale('pt_PT.UTF-8'))

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

sorted_keys = sorted(distritos.keys(), key=collator.getSortKey)
distritos = {key:distritos[key] for key in sorted_keys}



pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title> TPC2 EngWeb </title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h1> Mapa Virtual </h1>
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