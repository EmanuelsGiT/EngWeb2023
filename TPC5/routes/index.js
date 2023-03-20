var express = require('express');
var router = express.Router();
var Cont = require('../controllers/controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  	var data = new Date().toISOString().substring(0, 16)
  	Cont.tasksList()
  	.then(tasks =>{
		var auxT = 0
		for (let i = 0;i<tasks.length;i++){
		  	if (parseInt(tasks[i].id) > auxT){
				auxT = parseInt(tasks[i].id)
		  	}
		}
	auxT +=1
	Cont.usersList()
	.then(users =>{
		var auxU = 0
		for (let i = 0;i<users.length;i++){
			if (parseInt(users[i].id) > auxU){
				auxU = parseInt(users[i].id) +1
			}
		}
		res.render('index', { title: 'TaskList App', uList : users, tList : tasks,idU : auxU,idT : auxT, d : data});
	})
	.catch(erro => {
	  	res.render('error', {error: erro, message: "Erro na obtenção da lista Utilizadores"})
	})
  	})
  	.catch(erro => {
		res.render('error', {error: erro, message: "Erro na obtenção da lista de Tasks"})
  	})
});

/* Get delete/tasks/:id*/
router.get('/tasks/delete/:id', function(req, res, next) {
  	Cont.deleteTask(req.params.id)
	.then(
		res.redirect('/')
	)
	.catch(erro => {
		res.render('error', {error: erro, message: "Erro a eliminar uma tasks"})
	})
});

/* Get /tasks/done/:id*/
router.get('/tasks/done/:id', function(req, res, next) {
  	console.log(req.params.id)
  	Cont.doneTask(req.params.id)
	.then(
		res.redirect('/')
	)
	.catch(erro => {
		res.render('error', {error: erro, message: "Erro a colocar uma tasks como done"})
	})
});

router.get('/tasks/edit/:id', function(req, res, next) {
  	var data = new Date().toISOString().substring(0, 16)
  	Cont.getTask(req.params.id)
	.then( t =>{
	  Cont.usersList()
	  .then(users =>{
		tt = 'Task ' + t.id
		res.render('tasksFormEdit', { title: tt , t : t,uList : users, d : data})
	})
	.catch(erro => {
	  res.render('error', {error: erro, message: "Erro na obtenção da lista Utilizadores"})
	})
		
	  }
	)
	.catch(erro => {
	  res.render('error', {error: erro, message: "Erro no get da tasks"})
	})
});

router.post('/edit/tasks', function(req, res, next) {
  	Cont.updateTask(req.body)
	.then(
		res.redirect('/')
	)
	.catch(erro => {
		res.render('error', {error: erro, message: "Erro na alteração da tasks"})
	})
});


/* Post User */
router.post('/add/user', function(req, res, next) {
  	Cont.addUser(req.body)
	.then(
		res.redirect('/')
	)
	.catch(erro => {
		res.render('error', {error: erro, message: "Erro no armazenamento do user"})
	})
});

/* Post Task */
router.post('/add/task', function(req, res, next) {
  	Cont.addTask(req.body)
	.then(
		res.redirect('/')
	)
	.catch(erro => {
		res.render('error', {error: erro, message: "Erro no armazenamento da task"})
	})
});

module.exports = router;