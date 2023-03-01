import json
import time

def ordCidade(c):
    return c['nome']

f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
ligacoes = mapa['ligações']
distritos = dict()
lig = dict()
cid = dict()

for c in cidades:
    cid.update({c['id']:c['nome']})
    lig.update({c['id']: list()})

for l in ligacoes:
    o = l['origem']
    dest = l['destino']
    dist = l['distância']
    for c in cid:
        if c == o: lig[c] += [(cid[dest],str(dist),dest)]
        elif c == dest: lig[c] += [(cid[o],str(dist),o)]     
            
for l in lig:
    array = lig[l]
    array.sort(key=lambda x: x[0])

for c in cidades:
    pagHTML = f"""<!DOCTYPE html> 
            <html>
            <head>
                <title>{c['nome']}</title>
                <meta charset = "utf-8"/>
            </head>
            <body>
                <center>
                    <h1>{c['nome']}</h1>
                </center>
            """    
    nomefich = "./temp/" + str(c['id']) + ".html"
    f = open(nomefich,"w")  
    pagHTML += f"""
                <a name="{c['id']}"></a>
                <h3>{c['nome']}</h3>
                <p><b>População</b> {c['população']}</p>
                <p><b>Descrição:</b>{c['descrição']}</p>
                <p><b>Distrito:</b>{c['distrito']}</p>
                <h3> Ligações:</h3>
                <ul>
                """
    array = lig[c['id']]

    for elem in array:
        pagHTML += f"<li><a href='{elem[2]}'>{elem[0]}</a> - {elem[1]} Km</li>"

    pagHTML += f"""</ul>
                    <adress><a href="/"> [voltar ao Indice] </a>                
                        </body>
                    </html>"""
    f.write(pagHTML)
    f.close()