import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao'; 
import {filtro} from '../../model/filtro';


@Component({
  templateUrl: 'build/pages/sessoesAgora/sessoesAgora.html' ,
  providers: [sessoesService] 
})


export class SessoesAgora {

  filmesSelecionados = [];
  sessoes: sessao[];
  filtroInicial: filtro;


//lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
 constructor(private nav: NavController, private navParams: NavParams , private sessoesService : sessoesService){

    this.sessoesService = sessoesService;

    this.sessoesService.findNow().subscribe(
                data => {
                    this.sessoes = data; 
                },
                err => {
                    console.log(err);
                },
                () => console.log("")
            );



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



  selecionaOpcaoPrefs(listaPref){
    listaPref.selecionado = !listaPref.selecionado;
  }


}
