import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao';
import {filtro} from '../../model/filtro';
import {cinema} from '../../model/cinema';
import {Geolocation} from 'ionic-native';
import {cinemaService} from '../../services/cinema-service';

declare var geolib : any;

@Component({
  templateUrl: 'build/pages/sessoes/sessoes.html' ,
  providers: [sessoesService,cinemaService]
})


export class Sessoes {

  itensSelecionados = [];
  sessoesFiltradas = [];
  cinemas : cinema[];
  filtro: filtro;
  sessoes: sessao[];
  filtroData: string;
  tipoPesquisa;
  latitude : number;
  Longitude : number;
  sessoesOriginais = [];
  qtSessoes = 0;



//lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
 constructor(private nav: NavController,
             private navParams: NavParams ,
             private sessoesService : sessoesService,
             private cinemaService : cinemaService){

    this.itensSelecionados = navParams.get('param1');
    this.filtroData = navParams.get('param2');
    this.tipoPesquisa = navParams.get('param3');

    this.sessoesService = sessoesService;
    this.cinemaService = cinemaService;


    var filtro = ""


    //Se a consulta vier da página de cinemas
    if (this.tipoPesquisa === "C"){

            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idcinema;
            }
            filtro = filtro.substring(1,filtro.length)
            this.sessoesService.findByTheater(filtro,this.filtroData).subscribe(
                        data => {
                            this.sessoes = data;
                            this.qtSessoes = this.sessoes.length;
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            );
    //Se a consulta vier da página de filmes em cartaz
    }else{

            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idfilme;
            }
            filtro = filtro.substring(1,filtro.length)
            this.sessoesService.findById(filtro,this.filtroData).subscribe(
                        data => {
                            this.sessoes = data;
                            this.qtSessoes = this.sessoes.length;
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            );

            this.cinemaService.findCinemaPorSessao(filtro,this.filtroData).subscribe(
                        data => {
                            this.cinemas = data;
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            );


    }
  this.getAllDistances();
  this.sessoesOriginais = this.sessoes;
  }




  private getDistance (origin, destination){
    let distance = geolib.getDistance(origin, destination);
    return geolib.convertUnit('km',distance,2);
  }




  private getAllDistances(){

    Geolocation.getCurrentPosition().then(result=>{
      for (let i = 0; i < this.sessoes.length; i++){
        let sessao = this.sessoes[i];

        sessao.distancia = this.getDistance(
           {latitude: result.coords.longitude,
           longitude: result.coords.latitude},
           {latitude : sessao.latitude,
           longitude : sessao.longitude}
          )
        }
    });

  }



formataDistanciaAmigavel(distancia){

  if (distancia <= 2) {
    return "Bem perto";
  }
  else if (distancia > 2 && distancia <= 5){
    return "Perto";
  }
  else if (distancia > 5 && distancia <= 20){
    return "Um pouco longe";
  }
  else {
    return "Bem longe";
  }

}



formataHora(hora){
  var horaString = hora.toString();
  return horaString.substring(0,2) + ":" + horaString.substring(2,4);
}


calculaHoraFim(time, minsToAdd) {
  function z(n){
    return (n<10? '0':'') + n;
  }
  var bits = time.split(':');
  var mins = bits[0]*60 + (+bits[1]) + (+minsToAdd);

  return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);

}


  recuperaDistancia(idCinema){
    for (let i = 0; i < this.itensSelecionados.length; i++){
          let cinema = this.itensSelecionados[i];
          if (cinema.idcinema == idCinema ){return cinema.distancia}
    }
  }



  selecionaOpcaoPrefs(listaPref){

    for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.idcinema == listaPref.idcinema){
            item.selecionado = !item.selecionado;
         }
    }
    listaPref.selecionado = !listaPref.selecionado;
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



  retornaDataAtual(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();

    return ano + "-" + mes + "-" + dia;
  }



  filtrarSessoes(){
     let sessoesOrdenadas = [];
     for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.distancia <= 5){
           sessoesOrdenadas.push(item);
        }
     }
     this.sessoes = sessoesOrdenadas;
  }



}
