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
var sessoes_1 = require('../sessoes/sessoes');
var filmeEmCartaz_1 = require('../../model/filmeEmCartaz');
var ionic_angular_2 = require('ionic-angular');
var filmesEmCartaz_service_1 = require('../../services/filmesEmCartaz-service');
var ListaFilmes = (function () {
    function ListaFilmes(nav, navParams, filmesEmCartazService) {
        this.nav = nav;
        this.navParams = navParams;
        this.filmesEmCartazService = filmesEmCartazService;
        this.filmesSelecionados = [];
        this.contadorFilmesEscolhidos = 0;
        this.isClassVisible = false;
        this.filmes = [
            new filmeEmCartaz_1.filmeEmCartaz(1, 'Angry Birds - O Filme', 'Animação', 90, 5),
            new filmeEmCartaz_1.filmeEmCartaz(2, 'Pets', 'Animação', 120, 1),
            new filmeEmCartaz_1.filmeEmCartaz(3, 'Hush - A morte Ouve', 'Terror/Suspense', 90, 4),
            new filmeEmCartaz_1.filmeEmCartaz(4, 'The Invited', 'Suspense', 90, 2),
            new filmeEmCartaz_1.filmeEmCartaz(5, 'Toy Story 4', 'Animação', 130, 2),
            new filmeEmCartaz_1.filmeEmCartaz(6, 'Batman', 'Ação', 90, 4),
        ];
        this.filtro = navParams.get('param1');
        this.filmesEmCartazService = filmesEmCartazService;
    }
    Object.defineProperty(ListaFilmes, "parameters", {
        get: function () {
            return [[ionic_angular_1.NavController], [ionic_angular_2.NavParams], [filmesEmCartaz_service_1.filmesEmCartazService]];
        },
        enumerable: true,
        configurable: true
    });
    ListaFilmes.prototype.verSessoes = function () {
        this.nav.push(sessoes_1.Sessoes);
    };
    ListaFilmes.prototype.ngOnInit = function () {
        var _this = this;
        this.filmesEmCartazService.findAll().subscribe(function (data) { return _this.filmes = data; });
    };
    ListaFilmes.prototype.selecionaFilme = function (filmeEmCartaz, filmeCard) {
        var p = [];
        var flagEncontrado = false;
        var index;
        for (var i = 0; i < this.filmesSelecionados.length; i++) {
            var item = this.filmesSelecionados[i];
            if (item.id == filmeEmCartaz.id) {
                flagEncontrado = true;
                index = i;
            }
        }
        if (flagEncontrado == false) {
            this.filmesSelecionados.push(filmeEmCartaz);
            this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
            this.show = false;
        }
        else {
            this.filmesSelecionados.splice(index, 1);
            this.show = true;
            this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
        }
    };
    __decorate([
        core_1.ViewChild('layerMarcada'), 
        __metadata('design:type', core_1.ElementRef)
    ], ListaFilmes.prototype, "layerMarcada", void 0);
    ListaFilmes = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/listaFilmes/listaFilmes.html',
            providers: [filmesEmCartaz_service_1.filmesEmCartazService]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_2.NavParams, Object])
    ], ListaFilmes);
    return ListaFilmes;
}());
exports.ListaFilmes = ListaFilmes;
