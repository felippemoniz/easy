var PROPERTIES = require('./mock-filmesEmCartaz').data
var parser = require('xml2json');
var got = require('got');
var fs = require('fs');
var _ = require('lodash');
var utf8 = require('utf8');



function findAll(req, res, next) {
	var json = recriaJSONSimplificado(filmesEmCartazJSON());
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



//Recupera o json e faz o primeiro tratamento
function filmesEmCartazJSON(){

   var json = JSON.parse(fs.readFileSync('server/mock-filmesEmCartaz.js', 'utf8'));
   var nomeFilmeEditado = "";
   var json2;

   for(var i = 0; i < json.length; i++) {
		nome = json[i].nome;
		if (nome.indexOf("(") + 1 ){
			nome = nome.substring (0,nome.indexOf("("));
		}
		json[i].nome = nome
   }
   return json;
}



//Recria o Json simplificado apenas com as informações necessárias
function recriaJSONSimplificado(json){
	var filmesEmCartaz= {
	    data: []
	};

	for(var i = 0; i < json.length; i++) {    
	    var item = json[i];   
	    filmesEmCartaz.data.push({ 
	        "nomeFilme"  : utf8.encode(item.nome),
	        "genero"     : item.genero,
			"duracao"	: item.duracao ,
			"rating"	: 5 ,
			"selecionado"	: false
	    });
	    
	}

	filmesEmCartaz = arrUnique(filmesEmCartaz.data);

	return filmesEmCartaz;
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
