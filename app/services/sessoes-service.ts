import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let sessoesURL = SERVER_URL + 'sessoes/';
let sessoesAgoraURL = SERVER_URL + 'sessoesAgora/';
let sessoesHojeURL = SERVER_URL + 'sessoesHoje/';
let sessoesPorCinemaURL = SERVER_URL + 'sessoesPorCinema/';
let sessoesHojePorCinemaURL = SERVER_URL + 'sessoesHojePorCinema/';


@Injectable()
export class sessoesService {


  static get parameters() {
      return [[Http]];
  }

  constructor (private http:Http) {
      this.http = http;
  }

  findById(id,data) {
    if (data==this.retornaDataAtual()){
      return this.http.get(sessoesHojeURL + id +"/"+ data + "/"+ this.retornaHoraAtualSessoesAgora()  )
        .map(res => res.json())
        .catch(this.handleError);
    }else{
      return this.http.get(sessoesURL + id +"/"+ data )
        .map(res => res.json())
        .catch(this.handleError);
    }


  }

  retornaHoraAtualSessoesAgora(){
    var dataAtual = new Date();
    var hora = ("0" + (dataAtual.getHours())).slice(-2)
    var minuto = ("0" + (dataAtual.getMinutes())).slice(-2)
    return hora + minuto;

  }


  retornaDataAtual(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();

    return ano + "-" + mes + "-" + dia;
  }


  getDates(data) {
        return this.http.get(SERVER_URL + 'getDates/' + data )
          .map(res => res.json())
          .catch(this.handleError);

  }


  findByTheater(id,data) {

    if (data==this.retornaDataAtual()){
      console.log("Hoje")
      return this.http.get(sessoesHojePorCinemaURL + id +"/"+ data + "/"+ this.retornaHoraAtualSessoesAgora()  )
        .map(res => res.json())
        .catch(this.handleError);
    }else{
      console.log("utro dia")
      return this.http.get(sessoesPorCinemaURL + id +"/"+ data  )
        .map(res => res.json())
        .catch(this.handleError);
    }

  }

  findNow(data) {
        return this.http.get(sessoesAgoraURL + data )
          .map(res => res.json())
          .catch(this.handleError);

  }


  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
