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



  constructor(private nav: NavController, private navParams: NavParams , private sessoesService : sessoesService){
    this.filmesSelecionados = navParams.get('param1');
    this.sessoesService = sessoesService;

  }


  //Busca os registros no serviço
  ngOnInit() {
           this.sessoesService.findAll().subscribe(
               data => this.sessoes = data
            );
  } 


  selecionaOpcaoPrefs(listaPref){
    listaPref.selecionado = !listaPref.selecionado;
  }


}
