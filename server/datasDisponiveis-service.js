var PROPERTIES = require('./mock-datasDisponiveis').data
var parser = require('xml2json');
var got = require('got');


function findAll(req, res, next) {
    return res.json(PROPERTIES);
};


function findById(req, res, next) {
    var id = req.params.id;
    res.json(PROPERTIES[id - 1]);
}


exports.findAll = findAll;
exports.findById = findById;
