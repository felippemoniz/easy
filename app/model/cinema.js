"use strict";
var cinema = (function () {
    function cinema(idcinema,nomecinema,latitude,longitude,selecionado) {
        this.idcinema = idcinema;
        this.nomecinema = nomecinema;
        this.latitude = latitude;
		    this.longitude = longitude;
		    this.selecionado = selecionado;
    }
    return cinema;
}());
exports.cinema = cinema;
