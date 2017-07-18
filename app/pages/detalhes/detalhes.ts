import {OnInit} from '@angular/core';
import {Component} from '@angular/core'
import {NavController} from 'ionic-angular';
import {Sessoes} from '../sessoes/sessoes';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {NavParams} from 'ionic-angular';
import {filtro} from '../../model/filtro';



@Component({
  templateUrl: 'build/pages/detalhes/detalhes.html'
})

export class Detalhes {

	filmeSelecionado : filmeEmCartaz;


  	constructor(private nav: NavController, private navParams: NavParams){

    	this.filmeSelecionado = navParams.get('param1');
  }


    static get parameters() {
      return [[NavController], [NavParams]];
  }


  trataDetalhes(tipo, detalhe){
    if (tipo == "C"){
      if (detalhe == "0" || detalhe=="") {
        return "Livre"
      }else{
        return detalhe + " anos"
      }
    }
  }

  voltar()
  {
      this.nav.pop();
  }

}
