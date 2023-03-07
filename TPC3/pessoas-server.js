var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function(req,res)
{
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.url == "/")
    {
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.genMainPage(d))
    }
    else if (req.url == "/pessoas")
    {
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function(resp){
                var pessoas =resp.data
                console.log("Recuperei " + pessoas.length + " registos.")

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPessoasPage(pessoas, d))
            })
            .catch(erro =>{
                console.log("Erro " + erro)
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO" + erro + "</p>")
            })
    }
    else if (req.url.match(/p\d+/))
    {
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPessoaPage(pessoa, d))
            })
            .catch(erro =>{
                console.log("Erro " + erro)
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO" + erro + "</p>")
            })
    }
    else if(req.url.match(/[a-zA-Z]*w3\.css/))
    {
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                res.write("Erro")
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else if (req.url == "/ordDesc")
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas =resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1,p2) => (p1.nome < p2.nome) ? 1 : -1
                )

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPessoasPage(pessoasOrdenadas, d))
            })
            .catch(erro =>{
                console.log("Erro " + erro)
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO" + erro + "</p>")
            })
    }
    else if (req.url == "/distSexo")
    {
        axios.get('http://localhost:3000/pessoas/')
            .then(function(resp){
                var pessoas = resp.data

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.distSexoPage(pessoas, d))
            })
            .catch(erro =>{
                console.log("Erro " + erro)
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO" + erro + "</p>")
            })
    }
    else if(req.url.match(/sexo\/[a-z]+/))
    {
        axios.get('http://localhost:3000/pessoas?sexo=' + req.url.substring(6))
            .then(function(resp){
                var pessoas = resp.data 

                res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
                res.end(myPage.genPessoasPage(pessoas,d))    
            })
            .catch((erro)=>{
                console.log("Erro: " + erro)
            
                res.writeHead(500, {'Content-Type': 'text/html; charset: utf8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if (req.url == "/distDesporto")
    {
        axios.get('http://localhost:3000/pessoas/')
            .then(function(resp){
                var pessoas = resp.data

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.distDesportoPage(pessoas, d))
            })
            .catch(erro =>{
                console.log("Erro " + erro)
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO" + erro + "</p>")
            })
    }
    else if(req.url.match(/desporto\/[a-zA-Z]+/))
    {
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data 
                var desporto = decodeURIComponent(req.url.substring(10))
                var lista = new Array()

                pessoas.forEach((p) => {
                    if(p.desportos.includes(desporto)) lista.push(p)
                })

                res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
                res.end(mypages.genPessoasPage(lista,d))    
            })
            .catch((erro)=>{
                console.log("Erro: " + erro)
            
                res.writeHead(500, {'Content-Type': 'text/html; charset: utf8'})
                res.end("<p>Erro: " + erro + "</p>")
            })
    }
    else if (req.url == "/topProfissoes")
    {
        axios.get('http://localhost:3000/pessoas/')
            .then(function(resp){
                var pessoa = resp.data

                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.topProfPage(pessoa, d))
            })
            .catch(erro =>{
                console.log("Erro " + erro)
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO" + erro + "</p>")
            })
    }
    else if(req.url.match(/profissoes\/[a-zA-Z]+/))
    {
        var profissao = decodeURIComponent(req.url.substring(12))
        console.log(profissao)
        axios.get('http://localhost:3000/pessoas?profissao=' + profissao)
            .then(function(resp){
                var pessoas = resp.data             

                res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
                res.end(mypages.genPessoasPage(pessoas,d))    
            })
            .catch((erro)=>{
                console.log("Erro: " + erro)
            
                res.writeHead(500, {'Content-Type': 'text/html; charset: utf8'})
                res.end("<p>Erro: " + erro + "</p>")
            })
    }
    else
    {
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>ERRO: Operação não suportada...</p>") 
    }
    
}).listen(5555)

console.log("Servidor à escuta na porta 5555...");