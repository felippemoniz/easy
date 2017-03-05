import {Component} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/sessoes/sessoes.html'
})
export class Sessoes {

  filmesSelecionados = [];

  constructor(private nav: NavController, private navParams: NavParams){
    this.filmesSelecionados = navParams.get('param1');

  }


  selecionaOpcaoPrefs(listaPref){
    //this.filtro.preferencias.splice(listaPref);
    listaPref.selecionado = !listaPref.selecionado;
  }


}
