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



app.get('/filmesEmCartaz/:filtro', filmes.findAll);

app.get('/filmesEmCartaz/', filmes.findAll);

app.get('/sessoes/:id/:data', sessoes.findById);




app.get('/datasDisponiveis', datas.findAll);

app.get('', function(req, res) {
  res.json({notes: ":-)"})
})

app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})

});

app.listen(3000)


/*
app.get('/fruit/:fruitName/:fruitColor', function(req, res) {
    var data = {
        "fruit": {
            "apple": req.params.fruitName,
            "color": req.params.fruitColor
        }
    }; 

    send.json(data);
});*/
