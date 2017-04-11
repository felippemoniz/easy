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
}



function findById(req, res, next) {
  var query;
  var post;
  var id = req.params.id;
  var data = req.params.data;


  query="select * from easymovie.tbFilme filme, easymovie.tbhorario horario, easymovie.tbcinema cinema where horario.idfilme in ("+id+") and  horario.data='"+data.substring(0,10)+"' and horario.idfilme = filme.idfilme and horario.idcinema = cinema.idcinema order by horario asc";

  connection.query(query, id, function(err, rows, fields) {
      if (err) throw err;
      res.json(rows);
  });

  contabilizaAcesso(id);
}



function contabilizaAcesso(id){

  console.log("===>" + id)

  query="UPDATE easymovie.tbFilme SET qtacessos = qtacessos + 1  WHERE idfilme in ("+ id + ")";

  connection.query(query, id, function(err, rows, fields) {
      if (err) throw err;
  });

}


function like(req, res, next) {
    var property = req.body;
    PROPERTIES[property.id - 1].likes++;
    res.json(PROPERTIES[property.id - 1].likes);
}

exports.findAll = findAll;
exports.findById = findById;
exports.like = like;
