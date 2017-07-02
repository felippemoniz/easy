"use strict";
var dataDisponivel = (function () {
    function dataDisponivel(data,diasemana,selecionado) {
        this.data = data;
        this.diasemana = diasemana;
        this.selecionado = selecionado;
    }
    return dataDisponivel;
}());
exports.dataDisponivel = dataDisponivel;
