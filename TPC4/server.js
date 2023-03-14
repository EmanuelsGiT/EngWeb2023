var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tasks --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the task's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.mainPage(tasks, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks/:id --------------------------------------------------------------------
                else if(/\/tasks\/(u|t)[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let a = response.data
                            // Add code to render page with the task record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.taskFormPage(a, d))
                        })
                }
                // GET /tasks/registo --------------------------------------------------------------------
                else if(req.url == "/tasks/registo"){
                    // Add code to render page with the task form
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.taskFormPage(d))
                    res.end()
                }
                // GET /tasks/edit/:id --------------------------------------------------------------------
                else if(/\/tasks\/edit\/(u|t)[0-9]+$/i.test(req.url)){
                    // Get task record
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let a = response.data
                            // Add code to render page with the task record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.taskFormEditPage(a, d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo da task ${idTask}... Erro: ` + erro)
                            res.end()
                        })
                }
                // GET /tasks/done/:id --------------------------------------------------------------------
                else if(/\/tasks\/done\/(u|t)[0-9]+$/i.test(req.url)){
                    // set task done
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let a = response.data
                            axios.put("http://localhost:3000/tasks/" + idTask, {
                                "id": a.id,
                                "nome": a.nome,
                                "duedate": a.duedate,
                                "who": a.who,
                                "what": a.what,
                                "done": 1,
                            }).then(resp => {
                                console.log(resp.data)
                                res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location': '/tasks'});
                                res.end()
                                
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.end()
                            })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo da task ${idTask}... Erro: ` + erro)
                            res.end()
                        })
                }
                // GET /tasks/delete/:id --------------------------------------------------------------------
                else if(/\/tasks\/delete\/(u|t)[0-9]+$/i.test(req.url)){
                    // Get task record
                    var idTask = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let a = response.data
                            // Add code to render page with the task record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Delete feito com sucesso!!</p>")
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo do task ${idTask}... Erro: ` + erro)
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/tasks/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/tasks/", {
                                "id": result.id,
                                "nome": result.desc,
                                "duedate": result.duedate,
                                "who": result.who,
                                "what": result.what
                            }).then(resp => {
                                console.log(resp.data);
                                res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8','Location': '/tasks'});
                                res.end()                                
                            })
                            .catch(error => {
                                console.log(result.what)
                                console.log('Erro: ' + error);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to update task record..</p>")
                                res.end()
                            }) 
                        }
                    })
                }
                else if(req.url == "/users/registo") {
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/users/", {
                                "id": result.id,
                                "nome": result.nome,
                                "email": result.email,
                            }).then(resp => {
                                console.log(resp.data);
                                res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8','Location': '/tasks'});
                                res.end()                                
                            })
                            .catch(error => {
                                console.log(result.what)
                                console.log('Erro: ' + error);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to update task record..</p>")
                                res.end()
                            }) 
                        }
                    })
                }
                else if(/\/tasks\/edit\/(u|t)[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write('<p>Updated: ' + JSON.stringify(result) +  '</p>')
                                    res.end()
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update task record...</p>")
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



