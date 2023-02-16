import json

def ordCidade(cidade):
    return cidade['nome']


f = open("mapa.json")

mapa = json.load(f)

cidades = mapa['cidades']
cidades.sort(key=ordCidade)

ligacoes = mapa['ligações']
print(ligacoes)
ids = dict()

for c in cidades:
    ids[c['id']] = c['nome']


pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title> Mapa Virtual </title>
        <meta charset="utf-8" />
    </head>
    <body>
        <h1> Mapa Virtual </h1>
        <table>
            <tr>
                <!-- coluna do indice -->
                <td width="30%" valign="top">
                    <a name="indice"></a>
                    <h3>Índice</h3>
                    <ol>
"""


for c in cidades:
    pagHTML += f"<li><a href='#{c['id']}'> {c['nome']} </a></li>"
    
pagHTML += """</ol>
                </td>
                <!-- coluna do conteudo -->
                <td width="70%">
"""

for c in cidades:
    pagHTML += f"""
                    <a name="{c['id']}"></a>
                    <h3> {c['nome']} </h3>
                    <p> <b> Distrito: </b> {c['distrito']} </p>
                    <p> <b> População: </b> {c['população']} </p>
                    <p> <b> Descrição: </b> {c['descrição']} </p>
                    <h4> Ligações: </h4>
                    <p> <b>Destino</b>: Distancia km</p>
                    <adress> [<a href="#indice">Voltar ao Indice</a>]
                    <center>
                        <hr width="80%"/>
                    </center>
"""

pagHTML += """                    
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)