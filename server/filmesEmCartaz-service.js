var PROPERTIES = require('./mock-filmesEmCartaz').data
var parser = require('xml2json');
var got = require('got');
var fs = require('fs');


function findAll(req, res, next) {
   var data = res.json(PROPERTIES);
   console.log("@@@@@ "+ res.json(PROPERTIES).length);
   for(var i = 0; i < data.length; i++) {
   		console.log("$$$$$$$$$");
		console.log(data[i].nome);
   }
   return res.json(PROPERTIES);
};

/*
fs.readFile('./mock-filmesEmCartaz.js', 'utf8', function teste(err,data) {
  data = JSON.parse(data); // you missed that...
  for(var i = 0; i < data.length; i++) {
		console.log(data[i].nome);
  }
});
*/



/*
var state = [];
var lib = JSON.parse(fs.readFileSync('lib.json', 'utf8'));
...
for (i in lib) {
  for (x in lib[i]){
    state.push({pin:lib[i][x].pin, val:0});
  }
}
*/


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
