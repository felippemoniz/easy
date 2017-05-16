import {OnInit} from '@angular/core';
import {Component} from '@angular/core'
import {NavController} from 'ionic-angular';
import {Sessoes} from '../sessoes/sessoes';
import {Detalhes} from '../detalhes/detalhes';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {NavParams} from 'ionic-angular';
import {filtro} from '../../model/filtro';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {chip} from '../../model/chip';


@Component({
  templateUrl: 'build/pages/listaCinemas/listaCinemas.html',
  providers: [filmesEmCartazService]
})




export class ListaCinemas {





}