"use strict";
var filtro = (function () {
    function filtro(quando, oQue, preferencias) {
        if (preferencias === void 0) { preferencias = []; }
        this.quando = quando;
        this.oQue = oQue;
        this.preferencias = preferencias;
    }
    return filtro;
}());
exports.filtro = filtro;
