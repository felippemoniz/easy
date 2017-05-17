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


@Component({
  templateUrl: 'build/pages/listaCinemas/listaCinemas.html',
  providers: [cinemaService]
})



export class ListaCinemas {

  filtro: filtro;
  cinemas: cinema[];

  constructor(private nav: NavController, private navParams: NavParams, private cinemaService:cinemaService) {

    this.filtro = navParams.get('param1');
    this.cinemaService = cinemaService;

/*
    this.cinemaService.findAll().subscribe(
                data => {
                    this.cinemas = data;
                },
                err => {
                    console.log(err);
                },
                () => console.log("teste");
            ); */
  }

}
