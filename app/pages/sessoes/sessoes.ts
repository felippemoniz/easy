import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao'; 



@Component({
  templateUrl: 'build/pages/sessoes/sessoes.html' ,
  providers: [sessoesService] 
})


export class Sessoes {

  filmesSelecionados = [];
  sessoes: sessao[];


//lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
 constructor(private nav: NavController, private navParams: NavParams , private sessoesService : sessoesService){
    this.filmesSelecionados = navParams.get('param1');
    this.sessoesService = sessoesService;


    var filtro="";


    for (var i = 0; i < this.filmesSelecionados.length; i++) {
        filtro = filtro + "," + this.filmesSelecionados[i].id;
    } 

    filtro = filtro.substring(1,filtro.length)



    this.sessoesService.findById(filtro).subscribe(
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
