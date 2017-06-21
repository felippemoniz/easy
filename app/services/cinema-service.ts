import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let cinemas = SERVER_URL + 'cinemas/';
let sessoes = SERVER_URL + 'sessoesPorCinema/';

@Injectable()
export class cinemaService {


  static get parameters() {
      return [[Http]];
  }

  constructor (private http:Http) {
      this.http = http;
  }

  findAll() {
      return this.http.get(cinemas)
          .map(res => res.json())
          .catch(this.handleError);

  }

  findByTheater(id,data) {
        return this.http.get(sessoes + id +"/"+ data )
          .map(res => res.json())
          .catch(this.handleError);

  }


  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
