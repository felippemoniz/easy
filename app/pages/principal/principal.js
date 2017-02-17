"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var listaFilmes_1 = require('../listaFilmes/listaFilmes');
var filtro_1 = require('../../model/filtro');
var Principal = (function () {
    function Principal(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
        this.mostraFiltros = true;
        this.listaQueroIr = [];
        this.listaProcuraPor = [];
        this.listaPreferencias = [];
        this.clicker = false;
        this.listaQueroIr = ['HOJE', 'AMANHÃ', 'TERÇA-FEIRA', 'QUARTA-FEIRA'];
        this.listaProcuraPor = ['CINEMAS', 'FILMES'];
        this.listaPreferencias = ['DUBLADO', 'LEGENDADO', '3D'];
        this.filtro = new filtro_1.filtro();
    }
    Principal.prototype.mostraFiltro = function () {
        if (this.mostraFiltros) {
            this.mostraFiltros = false;
        }
        else {
            this.mostraFiltros = true;
        }
    };
    Principal.prototype.fecharFiltro = function () {
        this.mostraFiltros = true;
    };
    Principal.prototype.verFilmesCinemas = function () {
        this.nav.push(listaFilmes_1.ListaFilmes, {
            param1: this.filtro
        });
    };
    Principal.prototype.isVisible = function () {
        return this.mostraFiltros;
    };
    Principal.prototype.teste = function (event) {
        var target = event.srcElement.attributes.id || event.currentTarget.id;
        console.log(target);
        target.style.backgroundColor = 'black';
    };
    Principal.prototype.selecionaOpcaoQuando = function (dia) {
        this.filtro.quando = dia;
    };
    Principal.prototype.selecionaOpcaoQue = function (oque) {
        this.filtro.oQue = oque;
    };
    Principal.prototype.selecionaOpcaoPrefs = function (listaPref) {
        this.filtro.preferencias.push(listaPref);
    };
    Principal = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/principal/principal.html'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.NavParams])
    ], Principal);
    return Principal;
}());
exports.Principal = Principal;
