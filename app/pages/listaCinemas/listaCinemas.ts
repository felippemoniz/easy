import {OnInit} from '@angular/core';
import {Component} from '@angular/core'
import {NavController} from 'ionic-angular';
import {Sessoes} from '../sessoes/sessoes';
import {Detalhes} from '../detalhes/detalhes';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {cinema} from '../../model/cinema';
import {NavParams} from 'ionic-angular';
import {filtro} from '../../model/filtro';
import {cinemaService} from '../../services/cinema-service';
import {chip} from '../../model/chip';
import {Geolocation} from 'ionic-native'; 


declare var geolib : any;


@Component({
  templateUrl: 'build/pages/listaCinemas/listaCinemas.html',
  providers: [cinemaService]
})



export class ListaCinemas {

  filtro: filtro;
  cinemas: cinema[];
  cinemasSelecionados = [];
  contadorCinemasEscolhidos : number = 0;

  constructor(private nav: NavController, private navParams: NavParams, private cinemaService:cinemaService) {

    this.filtro = navParams.get('param1');
    this.cinemaService = cinemaService;

    this.cinemaService.findAll().subscribe(
                  data => {
                      this.cinemas = data;
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log()
              );

   // setInterval(() => {
      this.getAllDistances();
   // }, 3000);
    

  }



  private mycomparator(a,b) {
    return parseInt(a.distancia, 10) - parseInt(b.distancia, 10);
  }



  private getDistance (origin, destination){
    let distance = geolib.getDistance(origin, destination);
    
    return geolib.convertUnit('km',distance,2);
  }




  private getAllDistances(){

    Geolocation.getCurrentPosition().then(result=>{

      for (let i = 0; i < this.cinemas.length; i++){
        let cinema = this.cinemas[i];
        cinema.distancia = this.getDistance(
          {latitude: result.coords.latitude,
           longitude: result.coords.longitude},
          {latitude : cinema.latitude,
           longitude : cinema.longitude}
          )
        }    
        
        this.cinemas.sort(function (a, b) {
          return a.distancia - b.distancia;
        });

    });

  }


  selecionaCinema(cinema) {

    var p = [];
    var flagEncontrado= false;
    var index;

    var indexSelecionado = this.cinemas.indexOf(cinema);


   //Marca os filmes selecionados com o "check"
    if (this.cinemas[indexSelecionado].selecionado == 1){
        this.cinemas[indexSelecionado].selecionado = 0
    }else{
         this.cinemas[indexSelecionado].selecionado = 1
    }



    //faz a busca no array de filmes selecionados
    for (var i = 0; i < this.cinemasSelecionados.length; i++) {
       var item = this.cinemasSelecionados[i];
       if ( item.idcinema == cinema.idcinema) {
          flagEncontrado = true;
          index=i;
       }
    }


   if (flagEncontrado == false) {
     this.cinemasSelecionados.push (cinema);
     this.contadorCinemasEscolhidos = this.cinemasSelecionados.length;
   }
   else{
     this.cinemasSelecionados.splice(index,1);
     this.contadorCinemasEscolhidos = this.cinemasSelecionados.length;
   }

}


verSessoes(){
  this.nav.push(Sessoes, {
       param1: this.cinemasSelecionados, 
       param2 : this.filtro,
       param3 : "C"
   });
}


}
