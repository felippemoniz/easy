import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao'; 
import {filtro} from '../../model/filtro';
import {Geolocation} from 'ionic-native'; 

declare var geolib : any;

@Component({
  templateUrl: 'build/pages/sessoes/sessoes.html' ,
  providers: [sessoesService] 
})


export class Sessoes {

  itensSelecionados = [];
  sessoes: sessao[];
  filtroInicial: filtro;
  tipoPesquisa;
  latitude : number;
  Longitude : number;


//lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
 constructor(private nav: NavController, private navParams: NavParams , private sessoesService : sessoesService){
    this.itensSelecionados = navParams.get('param1');
    this.filtroInicial = navParams.get('param2');
    this.tipoPesquisa = navParams.get('param3');
    this.sessoesService = sessoesService;


    var dataSessoes = JSON.parse(this.filtroInicial.quando);
    var filtro="";
    var filtroPreferencias="";

    console.log(this.tipoPesquisa)


   //Recupera as preferências da tela de filtro inicial (dublado, legendado, 3d)
   for (var i = 0; i < this.filtroInicial.preferencias.length; i++) {
        filtroPreferencias = filtroPreferencias + "','" + this.filtroInicial.preferencias[i].nome;
    } 

    filtroPreferencias = filtroPreferencias.substring(2,filtroPreferencias.length)+ "'";



    //Se a consulta vier da página de cinemas
    if (this.tipoPesquisa === "C"){

            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idcinema;
            } 

            filtro = filtro.substring(1,filtro.length)


            this.sessoesService.findByTheater(filtro,dataSessoes.data,filtroPreferencias).subscribe(
                        data => {
                            this.sessoes = data; 
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
                filtro = filtro + "," + this.itensSelecionados[i].id;
            } 

            filtro = filtro.substring(1,filtro.length)

            this.sessoesService.findById(filtro,dataSessoes.data,filtroPreferencias).subscribe(
                        data => {
                            this.sessoes = data; 
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            );


    }


    this.getGeolocalizacao();

  }



  private getGeolocalizacao(){

    Geolocation.getCurrentPosition().then(result=>{
           this.latitude = result.coords.latitude;
           this.Longitude = result.coords.longitude;
    });

  }


  //AS primeiras sessoes vem com a localizacao undefined, porque o getgeolocalizacao ainda nao retornou
  private getDistance (latitude, longitude){
    let distance = geolib.getDistance(
           {latitude:this.latitude,
           longitude: this.Longitude},
          {latitude : Number(latitude),
           longitude : Number(longitude)}
           );
    
    return geolib.convertUnit('km',distance,2);
  }




formataHora(hora){
  return hora.substring(0,2) + ":" + hora.substring(2,4);
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
    listaPref.selecionado = !listaPref.selecionado;
  }


}
