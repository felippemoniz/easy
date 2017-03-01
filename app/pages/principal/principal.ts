import {Component} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {Filtros} from '../filtros/filtros';
import {filtro} from '../../model/filtro';
import {chip} from '../../model/chip';


@Component({
  templateUrl: 'build/pages/principal/principal.html'
})

export class Principal {


  constructor(private nav: NavController, private navParams: NavParams){

  }


  mostraFiltro(){
    this.nav.push(Filtros);
  }





}
