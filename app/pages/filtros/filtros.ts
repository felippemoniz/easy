import {Component} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {ListaCinemas} from '../listaCinemas/listaCinemas';
import {filtro} from '../../model/filtro';
import {chip} from '../../model/chip';
import {dataDisponivel} from '../../model/dataDisponivel';
import {datasDisponiveisService} from '../../services/datasDisponiveis-service';

@Component({
  templateUrl: 'build/pages/filtros/filtros.html',
  providers: [datasDisponiveisService]
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
  datas : dataDisponivel[];


  constructor(private nav: NavController, private navParams: NavParams,  private datasDisponiveisService: datasDisponiveisService){

  this.filtro = new filtro();
  this.datasDisponiveisService = datasDisponiveisService;
   
  this.datasDisponiveisService.findAll().subscribe(
                data => {
                    this.datas = data;
                    this.listaQueroIr = data; 
                },
                err => {
                    console.log(err);
                },
                () => console.log()
            );




  this.carregaFiltros();

  }








format(inputDate) {
    var date = new Date(inputDate);
    var dateHoje = new Date();

    /*
    Retirar depois
    */
    dateHoje.setDate(7);
    dateHoje.setMonth(3);



   if (!isNaN(date.getTime())) {

      if (date.getDate() === dateHoje.getDate() && 
        date.getMonth() === dateHoje.getMonth()){
          return "HOJE";
      }
      else if (date.getDate() === (dateHoje.getDate() + 1))   {
           return "AMANHÃ";
      }

      else {

            var day = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();

            return (day[1] ? day : '0' + day[0])  + '/' +
               (month[1] ? month : '0' + month[0]) + '/' + 
               date.getFullYear();
          }
    }
}





//TODO Deve vir do banco
 carregaFiltros(){

     let item = new chip();
     item.nome = 'LEGENDADO';
     item.selecionado = false;
     this.listaPreferencias.push (item);

     let item2 = new chip();
     item2.nome = 'DUBLADO';
     item2.selecionado = false;
     this.listaPreferencias.push (item2);

     let item3 = new chip();
     item3.nome = '3D';
     item3.selecionado = false;
     this.listaPreferencias.push (item3);

     let item7 = new chip();
     item7.nome = 'FILMES';
     item7.selecionado = false;
     this.listaProcuraPor.push (item7);

     let item8 = new chip();
     item8.nome = 'CINEMAS';
     item8.selecionado = false;
     this.listaProcuraPor.push (item8);

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
  
    var teste = JSON.stringify(this.filtro.oQue);
    var filtro = JSON.parse(teste);
    
    if (filtro.nome === "FILMES"){
            this.nav.push(ListaFilmes, {
                param1: this.filtro
            });
    }
        else{
            this.nav.push(ListaCinemas, {
                param1: this.filtro
            });
    }
    
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
    this.filtro.quando=JSON.stringify(listaQuero);
    var item;


     for (var i = 0; i < this.listaQueroIr.length; i++) {
        item = this.listaQueroIr[i];
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
