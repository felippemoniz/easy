import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao';
import {filtro} from '../../model/filtro';
import {Geolocation} from 'ionic-native';
import { Loading } from 'ionic-angular';


declare var geolib : any;

@Component({
  templateUrl: 'build/pages/sessoesAgora/sessoesAgora.html' ,
  providers: [sessoesService]
})


export class SessoesAgora {

  filmesSelecionados = [];
  sessoes: sessao[];
  sessoesOriginais = [];
  filtroInicial: filtro;
  latitude : number;
  Longitude : number;
  public loading = Loading.create();
  filtroData: string;
  qtSessoes = 0;

//lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
 constructor(private nav: NavController, private navParams: NavParams , private sessoesService : sessoesService){

    this.filtroData = navParams.get('param1');
    this.sessoesService = sessoesService;
    this.nav.present(this.loading);

    this.sessoesService.findNow(this.filtroData).subscribe(
                data => {
                    this.sessoes = data;
                    this.qtSessoes = this.sessoes.length;
                    this.loading.dismiss();
                },
                err => {
                    console.log(err);
                },
                () => console.log("")
            );

    this.getAllDistances();
    this.sessoesOriginais = this.sessoes;

  }



  formataHora(hora){
    var horaString = hora.toString();
    return horaString.substring(0,2) + ":" + horaString.substring(2,4);
  }


  verSessoesProximas(){
     let sessoesOrdenadas = [];
     for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.distancia <= 5){
           sessoesOrdenadas.push(item);
        }
     }
     this.sessoes = sessoesOrdenadas;
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


  private getDistance (origin, destination){
    let distance = geolib.getDistance(origin, destination);

    return geolib.convertUnit('km',distance,2);
  }




  private getAllDistances(){

    Geolocation.getCurrentPosition().then(result=>{
      for (let i = 0; i < this.sessoes.length; i++){
        let sessao = this.sessoes[i];
        console.log(result.coords.latitude + " - " + result.coords.longitude)
        sessao.distancia = this.getDistance(
           {latitude: result.coords.latitude,
           longitude: result.coords.longitude},
           {latitude : sessao.longitude,
           longitude : sessao.latitude}
          )
        }
    });

  }




calculaHoraFim(time, minsToAdd) {
  function z(n){
    return (n<10? '0':'') + n;
  }
  var bits = time.split(':');
  var mins = bits[0]*60 + (+bits[1]) + (+minsToAdd);

  return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);

}



  selecionaOpcaoPrefs(listaPref){
    listaPref.selecionado = !listaPref.selecionado;
  }


}
