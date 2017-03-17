
var mysql      = require('mysql');
var parser = require('xml2json');
var got = require('got');
var fs = require('fs');
var _ = require('lodash');


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
			 });
		}
		console.log("=>Json possui " + json.length + " datas. Incluídas no banco: "+ qtInclusoes);
}



function gravaFilmesEmCartaz(){
	   var json = JSON.parse(fs.readFileSync('server/mock-filmesEmCartaz.js', 'utf8'));
	   var query;
	   var post;
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

            post = {idfilme: json[i].id_filme ,
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

            query = connection.query('INSERT INTO tbfilme SET ?', post, function(err, result) {
 			 });
            console.log("################")
            console.log(query.sql);
	   }
	   console.log("=>Json possui " + json.length + " filmes. Incluídos no banco: "+ qtInclusoes);
}


connection.end();


