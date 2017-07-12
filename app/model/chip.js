"use strict";
var chip = (function () {
    function chip(nome, nomeDetalhado,selecionado) {
        if (chip === void 0) { chip = []; }
        this.nome = nome;
        this.nomeDetalhado = nomeDetalhado;
        this.selecionado = selecionado;
    }
    return chip;
}());
exports.chip = chip;
