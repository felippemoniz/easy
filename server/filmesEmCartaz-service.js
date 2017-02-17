var PROPERTIES = require('./mock-filmesEmCartaz').data
var parser = require('xml2json');
var got = require('got');

function findAll(req, res, next) {
    return res.json(PROPERTIES);

/*
    got("http://www.cinemark.com.br/programacao.xml")
        .then(response => {
           var json = parser.toJson(response.body);
        console.log('estou aqui');
           console.log(JSON.parse(json).cinemark.regioes);
        })
        .catch(error => {
            console.log(error.response.body);
        });
*/


};

function findById(req, res, next) {
    var id = req.params.id;
    res.json(PROPERTIES[id - 1]);
}




function like(req, res, next) {
    var property = req.body;
    PROPERTIES[property.id - 1].likes++;
    res.json(PROPERTIES[property.id - 1].likes);
}

exports.findAll = findAll;
exports.findById = findById;
exports.like = like;
