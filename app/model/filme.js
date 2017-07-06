"use strict";
var filme = (function () {
    function filmeEmCartaz(id, nomeFilme, selecionado) {
        this.idfilme = id;
        this.nomeFilme = nomeFilme;
        this.selecionado=selecionado;
    }
    return filme;
}());
exports.filme = filme;
