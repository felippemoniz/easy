var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var filmes = require('./server/filmesEmCartaz-service')
var cors = require('cors')


app.use(cors());
app.use(bodyParser.json());



app.get('/filmesEmCartaz', filmes.findAll);

app.get('', function(req, res) {
  res.json({notes: "asdf"})
})

app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})

});

app.listen(3000)
