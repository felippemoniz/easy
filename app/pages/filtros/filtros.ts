import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {ListaCinemas} from '../listaCinemas/listaCinemas';
import {filtro} from '../../model/filtro';
import {chip} from '../../model/chip';
import { Loading } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/filtros/filtros.html'
})

export class Filtros {

  mostraFiltros: boolean = true;
  listaQueroIr= [];
  listaProcuraPor=  [];
  listaPreferencias= [];
  clicker: boolean = false;
  filtro: filtro;
  isChecked: boolean = false;
  chipFiltroPreferencia: chip;
  public loading = Loading.create();
  testSlides: string[] = [];
  @ViewChild('botaoCinema') botaoCinema: any;


  constructor(private nav: NavController, private navParams: NavParams){


  }



  verCinemas(botaoCinema){
      this.botaoCinema.class
      this.nav.push(ListaCinemas, {
          param1: this.filtro
      });
  }


  verFilmes(){
      this.nav.push(ListaFilmes, {
          param1: this.filtro
      });
  }




  isVisible(){
    return this.mostraFiltros;
  }



}
