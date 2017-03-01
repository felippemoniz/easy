import {Component} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {filtro} from '../../model/filtro';
import {chip} from '../../model/chip';

@Component({
  templateUrl: 'build/pages/filtro/filtro.html'
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


  constructor(private nav: NavController, private navParams: NavParams){

  this.listaQueroIr = ['HOJE','AMANHÃ','TERÇA-FEIRA','QUARTA-FEIRA'];
  this.listaProcuraPor = ['CINEMAS','FILMES'];
  //this.listaPreferencias =['DUBLADO','LEGENDADO','3D'];
  this.filtro = new filtro();
  this.carregaFiltros();
  }


 carregaFiltros(){

     let item = new chip();
     item.nome = 'DUBLADO';
     item.selecionado = false;
     this.listaPreferencias.push (item);

     let item2 = new chip();
     item2.nome = 'LEGENDADO';
     item2.selecionado = false;
     this.listaPreferencias.push (item2);

     let item3 = new chip();
     item3.nome = '3D';
     item3.selecionado = false;
     this.listaPreferencias.push (item3);

 }


  mostraFiltro(){
    if(this.mostraFiltros){
        this.mostraFiltros = false;
    } else {
        this.mostraFiltros = true;
    }
  }

  fecharFiltro(){
        this.mostraFiltros = true;
  }

  verFilmesCinemas(){
    this.nav.push(ListaFilmes, {
        param1: this.filtro
    });
  }

  isVisible(){
    return this.mostraFiltros;
  }

  selecionaOpcaoQuando(dia){
    this.filtro.quando = dia;
  }

  selecionaOpcaoQue(oque){
    this.filtro.oQue = oque;
  }


  selecionaOpcaoPrefs(listaPref){
    if ((this.filtro.preferencias.indexOf(listaPref)) == -1){
        this.filtro.preferencias.push(listaPref);
     }else{
       this.filtro.preferencias.splice(this.filtro.preferencias.indexOf(listaPref),1);
     }

    listaPref.selecionado = !listaPref.selecionado;
  }



}
