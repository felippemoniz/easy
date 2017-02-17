"use strict";
var filmeEmCartaz = (function () {
    function filmeEmCartaz(id, nomeFilme, genero, duracao, rating, selecionado) {
        this.id = id;
        this.nomeFilme = nomeFilme;
        this.genero = genero;
        this.duracao = duracao;
        this.rating = rating;
        this.selecionado=selecionado;
    }
    return filmeEmCartaz;
}());
exports.filmeEmCartaz = filmeEmCartaz;
