var http = require('http');
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res)
{
    var pedido = url.parse(req.url, true).pathname
    var d = new Date().toISOString().substring(0,16)
    console.log(req._construct,req.method + " " + req.url + " " + d)
    if (pedido == '/')
    {
        fs.readFile('index.html', function(err,index)
        {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            if (err)
            {
                res.write("Erro na leitura do ficheiro: " + err)
            }
            else
            {
                res.write(index)
            }
            res.end()
        })
    }
    else
    {
        fs.readFile('./temp/' + pedido.substring(1) +'.html', function(err,html)
        {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            if (err)
            {
                res.write("Erro na leitura do ficheiro: " + err)
            }
            else
            {
                res.write(html)
            }
            res.end()
        })
    }
}).listen(5000)

console.log("Servidor à escuta na porta 5000...");