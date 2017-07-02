"use strict";
var filtro = (function () {
    function filtro(quando, cinemas, filmes) {
        if (cinemas === void 0) { cinemas = []; }
        if (filmes === void 0) { filmes = []; }
        this.cinemas = cinemas;
        this.filmes = filmes;
    }
    return filtro;
}());
exports.filtro = filtro;
