"use strict";
var sessao = (function () {
    function sessao(id, nomeFilme,nomeCinema,horaInicio,horaFim,duracao,rating,imagemAvatar,distancia,selecionado) {
        this.id = id;
        this.nomeFilme = nomeFilme;
        this.nomeCinema = nomeCinema;
		this.horaInicio = horaInicio;
		this.horaFim = horaFim;
		this.duracao = duracao;
		this.rating = rating;
		this.imagemAvatar = imagemAvatar;
		this.latitude = latitude;
	    this.longitude = longitude;
		this.distancia = distancia;
		this.selecionado = selecionado;
    }
    return sessao;
}());
exports.sessao = sessao;



