var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var filmes = require('./server/filmesEmCartaz-service')
var datas = require('./server/datasDisponiveis-service')
var sessoes = require('./server/sessoes-service')
var datasDisponiveis = require('./server/datasDisponiveis-service')
var cors = require('cors')


app.use(cors());
app.use(bodyParser.json());



app.get('/filmesEmCartaz', filmes.findAll);

app.get('/sessoes', sessoes.findAll);

app.get('/datasDisponiveis', datas.findAll);

app.get('', function(req, res) {
  res.json({notes: ":-)"})
})

app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})

});

app.listen(3000)
