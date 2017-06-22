import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {ListaCinemas} from '../listaCinemas/listaCinemas';
import {SessoesAgora} from '../sessoesAgora/sessoesAgora';
import {filtro} from '../../model/filtro';
import {chip} from '../../model/chip';
import { Loading } from 'ionic-angular';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';

@Component({
  templateUrl: 'build/pages/filtros/filtros.html',
  providers: [filmesEmCartazService]
})

export class Filtros {

  filmes: filmeEmCartaz[];
  public loading = Loading.create();
  testSlides: string[] = [];
  @ViewChild('botaoCinema') botaoCinema: any;
  dataAtual: string ="";



  constructor(private nav: NavController, private navParams: NavParams,  private filmesEmCartazService: filmesEmCartazService){

     this.dataAtual = this.retornaDataAtual();

     this.filmesEmCartazService = filmesEmCartazService;

     this.filmesEmCartazService.getTop6().subscribe(
                  data => {
                      this.filmes = data;
                      console.log(this.filmes.length)
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


  verCinemas(){
     console.log("sdfasdfasdfasdfasd")
     this.nav.push(ListaCinemas, {
          param1: this.dataAtual
      });
  }


  verFilmes(){
     this.nav.push(ListaFilmes, {
          param1: this.dataAtual
      });
  }


  verSessoesAgora(){
    this.nav.push(SessoesAgora, {
        param1: this.dataAtual
     });
  }




}
