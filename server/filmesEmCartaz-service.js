var PROPERTIES = require('./mock-filmesEmCartaz').data
var parser = require('xml2json');
var mysql      = require('mysql');



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'easymovie'
});



function findAll(req, res, next) {

  var query;
  var post;
  var filtro = req.params.filtro;

  query="select distinct idfilme id, nome, genero, sinopse, poster, classificacao, duracao, notaimdb, imagem,tipo, tipo3d, false selecionado from easymovie.tbfilme " +
  "where tipo IN ("+filtro+") order by qtacessos desc, nome asc" ;


  connection.query(query, function(err, rows, fields) {
      if(err) {
        throw err;
      }else{
        res.json(rows);
      }

  });

}



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
