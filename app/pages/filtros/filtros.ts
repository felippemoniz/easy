import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {ListaCinemas} from '../listaCinemas/listaCinemas';
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


  constructor(private nav: NavController, private navParams: NavParams,  private filmesEmCartazService: filmesEmCartazService){


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



  verCinemas(){
     console.log("sdfasdfasdfasdfasd")
     this.nav.push(ListaCinemas, {
          param1: "2017-06-20"
      });
  }


  verFilmes(){
     this.nav.push(ListaFilmes, {
          param1: "2017-06-20"
      });
  }


  verSessoes(){
    this.nav.push(Sessoes, {
         param1: this.cinemasSelecionados,
         param2 : this.filtroData,
         param3 : "C"
     });
  }




}
