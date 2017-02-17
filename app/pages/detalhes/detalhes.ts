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

}
