
var mysql      = require('mysql');
var parser = require('xml2json');
var got = require('got');
var fs = require('fs');
var request = require('request');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'easymovie'
});


connection.connect();

//################## EXECUCAO DA CARGA DAS TABELAS ######################
console.log("### INICIO DA CARGA ####");
//gravaDatasDisponiveis();
//gravaFilmesEmCartaz();
recuperaDetalhesFilme("a grande muralha");
console.log("### FIM DA CARGA #####");
//#######################################################################

/*
	filmesEmCartaz.data.push({ 
	        "nomeFilme"  : unescape(nome),
	        "genero"     : json[i].genero,
			"duracao"	: json[i].duracao ,
			"rating"	: 5 ,
			"selecionado"	: false,
			"classificacao" : json[i].classificacao
	    });
*/


function recuperaDetalhesFilme(nome){
  var json1, json2 = [];
  var id;
  var stringJson;
  request('http://api.themoviedb.org/3/search/movie?query=&query='+nome+'&language=pt-BR&api_key=5fbddf6b517048e25bc3ac1bbeafb919', function (error, response, body) {
	  json=JSON.parse(body);
	  id = json.results[0].id;
	  
	  request('http://api.themoviedb.org/3/movie/'+id+'/images?api_key=5fbddf6b517048e25bc3ac1bbeafb919', function (error, response, body) {
	  json2=JSON.parse(body);
	  
	  stringJson = "{sinopse:" + json.results[0].overview + 
	  			  ", poster: https://image.tmdb.org/t/p/w500/" + json.results[0].poster_path +
	  			  ", imagem: https://image.tmdb.org/t/p/w500/" + json2.backdrops[0].file_path + "}";
  	  });


  });


}



function gravaDatasDisponiveis(){
	   var json = JSON.parse(fs.readFileSync('server/mock-datasDisponiveis.js', 'utf8'));
	   var query;
	   var post;
	   var qtInclusoes=0;

	    for(var i = 0; i < json.length; i++) {
			 post  = {dtcarga: new Date() , data: json[i]};
			 query = connection.query('INSERT INTO tbdata SET ?', post, function(err, result) {
			 });
		}
}



function gravaFilmesEmCartaz(){
	   var json = JSON.parse(fs.readFileSync('server/mock-filmesEmCartaz.js', 'utf8'));
	   var queryFilme;
	   var querySessao;
	   var postFilme;
	   var postSessao;
	   var qtInclusoes=0;
	   var tipo3d;
	   var tipo;
	   var sala;

	  for(var i = 0; i < json.length; i++) {
			nome = json[i].nome;
			tipo3D="";
			tipo="";

			if (nome.indexOf("3D") + 1 ){
				nome = nome.replace ("3D","");
				tipo3d="3D";
			}

			if (nome.indexOf("Dublado") + 1){
				//nome = nome.replace ("DUBLADO","");
				tipo="DUBLADO";
			}else if (nome.indexOf("Legendado") + 1){
				//nome = nome.replace ("LEGENDADO","");
				tipo="LEGENDADO";
			}

			if (nome.indexOf("(") + 1 ){
				nome = nome.substring (0,nome.indexOf("("));
			}

            postFilme = {idfilme: json[i].id_filme ,
	            		dtcarga:  new Date(),
	            		nome: nome,
	            		genero: json[i].genero,
	            		classificacao: json[i].classificacao,
	            		duracao: json[i].duracao.replace ("minutos",""),
	            		sinopse: json[i].descricao,
	            		notaimdb: 5,
	            		linkimdb: null,
	            		imagem: null,
	            		linktrailer: null,
	            		poster:  null,
	            		tipo: tipo,
	            		tipo3d : tipo3d}


            queryFilme = connection.query('INSERT INTO tbfilme SET ?', postFilme, function(err, result) {
			 });

 
		    for(var j = 0; j < json[i].horario.length; j++) { 

        	postSessao = {idfilme : json[i].id_filme,
        				 idcinema : json[i].horario[j].id_localidade,
        				 horario  : json[i].horario[j].horario}

			querySessao = connection.query('INSERT INTO tbhorario SET ?', postSessao, function(err, result) {
        	});

		    }


	   }

}


connection.end();


