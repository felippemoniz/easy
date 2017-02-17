"use strict";
var chip = (function () {
    function chip(nome, selecionado) {
        if (chip === void 0) { chip = []; }
        this.nome = nome;
        this.selecionado = selecionado;
    }
    return chip;
}());
exports.chip = chip;
