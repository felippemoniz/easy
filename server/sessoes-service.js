var PROPERTIES = require('./mock-sessoes').data
var parser = require('xml2json');
var got = require('got');


function findAll(req, res, next) {
	console.log('vou consultar o JSON');
    return res.json(PROPERTIES);
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
