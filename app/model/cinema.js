"use strict";
var cinema = (function () {
    function cinema(idcinema,nomecinema,latitude,longitude, distancia,selecionado) {
        this.idcinema = idcinema;
        this.nomecinema = nomecinema;
        this.latitude = latitude;
	    this.longitude = longitude;
	    this.distancia = distancia;
	    this.selecionado = selecionado;
    }
    return cinema;
}());
exports.cinema = cinema;
