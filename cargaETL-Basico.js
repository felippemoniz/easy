
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
gravaDatasDisponiveis();
gravaFilmesEmCartaz();
console.log("### FIM DA CARGA #####");
//#######################################################################





function gravaDatasDisponiveis(){
	   var json = JSON.parse(fs.readFileSync('server/mock-datasDisponiveis.js', 'utf8'));
	   var query;
	   var post;
	   var qtInclusoes=0;


	    for(var i = 0; i < json.length; i++) {
			 post  = {dtcarga: new Date() , data: json[i]};
			 query = connection.query('INSERT INTO tbdata SET ?', post, function(err, result) {
			 	console.log(err);
			});
		}
}



function gravaFilmesEmCartaz(){
	   var json = JSON.parse(fs.readFileSync('server/mock-filmesEmCartaz.js', 'utf8'));
	   var jsonDetalhes;
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
	            		nome: convert(nome),
	            		genero: convert(json[i].genero),
	            		classificacao: json[i].classificacao,
	            		duracao: json[i].duracao.replace ("minutos",""),
	            		sinopse: json[i].descricao,
	            		notaimdb: null,
	            		linkimdb: null,
	            		linktrailer: null,
	            		tipo: tipo,
	            		tipo3d : tipo3d}


            queryFilme = connection.query('INSERT INTO tbfilme SET ?', postFilme, function(err, result) {
            	console.log("Filme")
			});


			for(var j = 0; j < json[i].horario.length; j++) { 
	        	postSessao = {idfilme : json[i].id_filme,
	        				 idcinema : json[i].horario[j].id_localidade,
	        				 horario  : json[i].horario[j].horario}

				querySessao = connection.query('INSERT INTO tbhorario SET ?', postSessao, function(err, result) {
					console.log("-----Sessão")
	        	});
	    	}




	   }

}


connection.end();

function convert(str)
{

	str = str.replace("&amp;" , '&' );
	str = str.replace("&lt;" , '<' );
	str = str.replace("&gt;" , '>' );
	str = str.replace("&ordf;" , 'ª' );  
	str = str.replace("&Agrave;" , 'À' );
	str = str.replace("&Aacute;" , 'Á' );
	str = str.replace("&Acirc;" , 'Â' );
	str = str.replace("&Atilde;" , 'Ã' );  
	str = str.replace("&Ccedil;" , 'Ç' );
	str = str.replace("&Egrave;" , 'È' );
	str = str.replace("&Eacute;" , 'É' );
	str = str.replace("&Ecirc;" , 'Ê' );  
	str = str.replace("&Iacute;" , 'Í' );
	str = str.replace("&Oacute;" , 'Ó' );
	str = str.replace("&Ocirc;" , 'Ô' );
	str = str.replace("&Otilde;" , 'Õ' );  
	str = str.replace("&Uacute;" , 'Ú' );
	str = str.replace("&agrave;" , 'à' );
	str = str.replace("&aacute;" , 'á' );
	str = str.replace("&acirc;" , 'â' );  
	str = str.replace("&atilde;" , 'ã' );
	str = str.replace("&ccedil;" , 'ç' );
	str = str.replace("&egrave;" , 'è' );  
	str = str.replace("&eacute;" , 'é' );
	str = str.replace("&ecirc;" , 'ê' );
	str = str.replace("&iacute;" , 'í' );  
	str = str.replace("&oacute;" , 'ó' );
	str = str.replace("&ocirc;" , 'ô' ); 
	str = str.replace("&otilde;" , 'õ' );
	str = str.replace("&uacute; " , 'ú' ); 

  return str;
}
