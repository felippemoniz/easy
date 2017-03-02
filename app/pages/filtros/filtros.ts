import {Component} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {filtro} from '../../model/filtro';
import {chip} from '../../model/chip';

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


  constructor(private nav: NavController, private navParams: NavParams){

  this.filtro = new filtro();
  this.carregaFiltros();

  }


//TODO Deve vir do banco
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


     let item4 = new chip();
     item4.nome = 'HOJE';
     item4.selecionado = true;
     this.listaQueroIr.push (item4);

     let item5 = new chip();
     item5.nome = 'AMANHÃ';
     item5.selecionado = false;
     this.listaQueroIr.push (item5);



     let item6 = new chip();
     item6.nome = 'FILMES';
     item6.selecionado = true;
     this.listaProcuraPor.push (item6);

     let item7 = new chip();
     item7.nome = 'CINEMAS';
     item7.selecionado = false;
     this.listaProcuraPor.push (item7);


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




  selecionaOpcaoQueroIr(listaQuero){
    this.filtro.quando=listaQuero;

     for (var i = 0; i < this.listaQueroIr.length; i++) {
        var item = this.listaQueroIr[i];
        item.selecionado = false;
     }

    listaQuero.selecionado = !listaQuero.selecionado;

  }


  selecionaOpcaoProcurarPor(listaProcura){
    this.filtro.oQue =listaProcura;

     for (var i = 0; i < this.listaProcuraPor.length; i++) {
        var item = this.listaProcuraPor[i];
        item.selecionado = false;
     }

    listaProcura.selecionado = !listaProcura.selecionado;

  }


}
