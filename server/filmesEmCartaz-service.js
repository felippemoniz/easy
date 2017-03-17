var PROPERTIES = require('./mock-filmesEmCartaz').data
var parser = require('xml2json');
var got = require('got');
var fs = require('fs');
var _ = require('lodash');
var utf8 = require('utf8');



function findAll(req, res, next) {
	var json = filmesEmCartazJSON();
	json = json.sort( predicateBy("nomeFilme") );
	return res.json(json);
};



// Retira as duplicidades do json
function arrUnique(arr) {
    var cleaned = [];
    arr.forEach(function(itm) {
        var unique = true;
        cleaned.forEach(function(itm2) {
            if (_.isEqual(itm, itm2)) unique = false;
        });
        if (unique)  cleaned.push(itm);
    });
    return cleaned;
}



//Recupera o json, faz o tratamento dos dados e retorna um novo jason
function filmesEmCartazJSON(){

   var json = JSON.parse(fs.readFileSync('server/mock-filmesEmCartaz.js', 'utf8'));
   var nomeFilmeEditado = "";
   var json2;
   var filmesEmCartaz= {
	    data: []
	};

   for(var i = 0; i < json.length; i++) {
		nome = json[i].nome;
		if (nome.indexOf("(") + 1 ){nome = nome.substring (0,nome.indexOf("("));}
		if (nome.indexOf("3D") + 1 ){nome = nome.replace ("3D","");}
		if (json[i].classificacao == "0") { json[i].classificacao="Livre" } else { json[i].classificacao=json[i].classificacao + " anos" }

		filmesEmCartaz.data.push({ 
	        "nomeFilme"  : unescape(nome),
	        "genero"     : json[i].genero,
			"duracao"	: json[i].duracao ,
			"rating"	: 5 ,
			"selecionado"	: false,
			"classificacao" : json[i].classificacao
	    });

   }

   	filmesEmCartaz = arrUnique(filmesEmCartaz.data);
	return filmesEmCartaz;
}

//Faz a ordenação por qualquer campo do json
function predicateBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
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
