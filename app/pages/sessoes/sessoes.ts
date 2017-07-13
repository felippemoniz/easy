import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao';
import {filtro} from '../../model/filtro';
import {cinema} from '../../model/cinema';
import {filme} from '../../model/filme';
import {chip} from '../../model/chip';
import {Geolocation} from 'ionic-native';
import {cinemaService} from '../../services/cinema-service';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import { Loading } from 'ionic-angular';

declare var geolib : any;


@Component({
  templateUrl: 'build/pages/sessoes/sessoes.html' ,
  providers: [sessoesService,cinemaService,filmesEmCartazService]
})


export class Sessoes {

  itensSelecionados = [];
  sessoesFiltradas = [];
  cinemas : cinema[];
  filmes : filme[];
  tags = [];
  filtro: filtro;
  sessoes: sessao[];
  filtroData: string;
  tipoPesquisa;
  latitude : number;
  Longitude : number;
  sessoesOriginais = [];
  qtSessoes = 0;
  diaSemanaEscolhido : string = "";
  public loading = Loading.create();



 constructor(private nav: NavController,
             private navParams: NavParams ,
             private sessoesService : sessoesService,
             private cinemaService : cinemaService,
             private filmesEmCartazService : filmesEmCartazService){

    

    this.itensSelecionados = navParams.get('param1');
    this.filtroData = navParams.get('param2');
    this.tipoPesquisa = navParams.get('param3');
    this.diaSemanaEscolhido = navParams.get('param4');

    this.sessoesService = sessoesService;
    this.cinemaService = cinemaService;
    this.filmesEmCartazService = filmesEmCartazService;


    var filtro = ""

    this.carregaTags();

    this.nav.present(this.loading);

 

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

            this.filmesEmCartazService.findFilmesPorSessao(filtro,this.filtroData).subscribe(
                        data => {
                            this.filmes = data;
                            this.loading.dismiss(); 
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
                            this.loading.dismiss(); 
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



  private carregaTags(){

     let item = new chip();
     item.nome = 'LEG';
     item.nomeDetalhado = 'Legendado'; 
     item.selecionado = false;
     this.tags.push (item);

     let item2 = new chip();
     item2.nome = 'DUB';
     item2.nomeDetalhado = 'Dublado';
     item2.selecionado = false;
     this.tags.push (item2);

     let item3 = new chip();
     item3.nome = '3D';
     item3.nomeDetalhado = '3D';     
     item3.selecionado = false;
     this.tags.push (item3);

     let item4 = new chip();
     item4.nome = '2D';
     item4.nomeDetalhado = 'Normal';     
     item4.selecionado = false;
     this.tags.push (item4);

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



  selecionaTagCinema(listaPref){

    for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.idcinema == listaPref.idcinema){
            item.selecionado = !item.selecionado;
         }
    }
    listaPref.selecionado = !listaPref.selecionado;
  }



  selecionaTagFilme(listaPref){

    for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.idfilme == listaPref.idfilme){
            item.selecionado = !item.selecionado;
         }
    }
    listaPref.selecionado = !listaPref.selecionado;
  }



  selecionaTag(tag){

  var item, tipo
      for (var i = 0; i < this.sessoes.length; i++) {
          item = this.sessoes[i];
          tipo = item.tipo;
          //console.log(tag.nomeDetalhado + " está dentro de => " + tipo + "=" + tipo.indexOf(tag.nomeDetalhado))
          if (tipo.indexOf(tag.nomeDetalhado)<0){
                item.selecionado = !tag.selecionado;
              }else{
                item.selecionado = tag.selecionado;
              }
           }


      //this.contaSessoes()
      tag.selecionado = !tag.selecionado;
  }


  contaSessoes(){
    var item, count=0
     for (var i = 0; i < this.sessoes.length; i++) {
       item = this.sessoes[i];
       if (item.selecionado){
         count++
       }
     }
     console.log(count)
     this.qtSessoes = count;
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


voltar()
{
    this.nav.pop();  
}


}
