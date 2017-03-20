import {OnInit} from '@angular/core';
import {Component} from '@angular/core'
import {NavController} from 'ionic-angular';
import {Sessoes} from '../sessoes/sessoes';
import {Detalhes} from '../detalhes/detalhes';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {NavParams} from 'ionic-angular';
import {filtro} from '../../model/filtro';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {chip} from '../../model/chip';

@Component({
  templateUrl: 'build/pages/listaFilmes/listaFilmes.html',
  providers: [filmesEmCartazService]
})




export class ListaFilmes {

  corSelecionado : string;
  cardSelecionado : boolean;
  filmes: filmeEmCartaz[];
  filmesSelecionados = [];
  contadorFilmesEscolhidos : number = 0;
  isClassVisible: boolean = false;
  filtro: filtro;
  qtFilme = 0;


  constructor(private nav: NavController, private navParams: NavParams, private filmesEmCartazService) {
    this.filtro = navParams.get('param1');
    this.filmesEmCartazService = filmesEmCartazService;


    this.filmesEmCartazService.findAll().subscribe(
                data => {
                    this.filmes = data; 
                    this.qtFilme = this.filmes.length;
                    console.log(this.qtFilme);
                },
                err => {
                    console.log(err);
                },
                () => console.log(this.qtFilme)
            );
      

  }

  static get parameters() {
      return [[NavController], [NavParams], [filmesEmCartazService]];
  }


   verSessoes(){
     this.nav.push(Sessoes, {
          param1: this.filmesSelecionados
      });
   }


   verDetalhes(filmeEmCartaz){
    this.nav.push(Detalhes, {
         param1: filmeEmCartaz
     });
   }



   //Seleciona os filmes, marcando com um check, atualizando o contador em tela e
   //carregando o array filmes selecionados
   selecionaFilme(filmeEmCartaz, filmeCard) {

     var p = [];
     var flagEncontrado= false;
     var index;

     var indexSelecionado = this.filmes.indexOf(filmeEmCartaz);


    //Marca os filmes selecionados com o "check"
     this.filmes[indexSelecionado].selecionado = !this.filmes[indexSelecionado].selecionado


     //faz a busca no array de filmes selecionados
     for (var i = 0; i < this.filmesSelecionados.length; i++) {
        var item = this.filmesSelecionados[i];
        if ( item.id == filmeEmCartaz.id) {
           flagEncontrado = true;
           index=i;
        }
     }

    if (flagEncontrado == false) {
      this.filmesSelecionados.push (filmeEmCartaz);
      this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
    }
    else{
      this.filmesSelecionados.splice(index,1);
      this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
    }

}


  selecionaOpcaoPrefs(listaPref){
    //this.filtro.preferencias.splice(listaPref);
    listaPref.selecionado = !listaPref.selecionado;
  }

}
