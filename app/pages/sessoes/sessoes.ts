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

    var filtro = JSON.parse(JSON.stringify(this.filmesSelecionados));
    console.log(filtro[0].id);


    this.sessoesService.findById(filtro[0].id).subscribe(
                data => {
                    this.sessoes = data; 
                },
                err => {
                    console.log(err);
                },
                () => console.log("")
            );



  }



  selecionaOpcaoPrefs(listaPref){
    listaPref.selecionado = !listaPref.selecionado;
  }


}
