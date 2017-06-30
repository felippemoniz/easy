import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {ListaCinemas} from '../listaCinemas/listaCinemas';
import {SessoesAgora} from '../sessoesAgora/sessoesAgora';
import {filtro} from '../../model/filtro';
import {dataDisponivel} from '../../model/dataDisponivel';
import {chip} from '../../model/chip';
import { Loading } from 'ionic-angular';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {sessoesService} from '../../services/sessoes-service';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {Http} from '@angular/http';

@Component({
  templateUrl: 'build/pages/filtros/filtros.html',
  providers: [filmesEmCartazService, sessoesService]
})

export class Filtros {

  filmes: filmeEmCartaz[];
  datas : dataDisponivel[];
  public loading = Loading.create();
  testSlides: string[] = [];
  @ViewChild('botaoCinema') botaoCinema: any;
  dataAtual: string ="";
  dataEscolhida : string = ""


  constructor(private nav: NavController,
              private navParams: NavParams,
              private filmesEmCartazService: filmesEmCartazService,
              private sessoesService : sessoesService,
              public http: Http){

     this.dataAtual = this.retornaDataAtual();

     this.filmesEmCartazService = filmesEmCartazService;
     this.sessoesService = sessoesService;
/*
     this.filmesEmCartazService.getTop6().subscribe(
                  data => {
                      this.filmes = data
                      console.log(this.filmes.length)
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log()
      );
*/

      this.sessoesService.getDates(this.dataAtual).subscribe(
                  data => {
                      this.datas = data;
                      console.log(this.datas.length)
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log()
      );

  }





  retornaDataAtual(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();

    return ano + "-" + mes + "-" + dia;
  }


  formataData(data){
    var dia,mes,ano,dataReduzida;
    dataReduzida = data.substring(0,10)
    mes = data.substring(5,7);
    dia = data.substring(8,10)

    if (dataReduzida == this.retornaDataAtual()){
      return "Hoje"
    }
    else{
      return dia + "/" + mes ;
    }
  }


  formataDataServico(data){
    var dia,mes,ano,dataReduzida;
    dataReduzida = data.substring(0,10)
    mes = data.substring(5,7);
    dia = data.substring(8,10)
    if (data != null){
      return data.substring(0,10);
    }
    else{
      return null;
    }

  }



  verCinemas(){
     this.nav.push(ListaCinemas, {
          param1: this.dataAtual
      });
  }


  verFilmes(){
     var data = this.dataEscolhida;
     if (data=="") {
       data = this.dataAtual;
     }
     else{
       data=this.formataDataServico(this.dataEscolhida)
     }
     
     this.nav.push(ListaFilmes, {
          param1: data
      });
  }


  verSessoesAgora(){
    this.nav.push(SessoesAgora, {
        param1: this.dataAtual
     });
  }




}
