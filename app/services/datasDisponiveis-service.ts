import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let principalURL = SERVER_URL + 'datasDisponiveis/';

@Injectable()
export class datasDisponiveisService {


  static get parameters() {
      return [[Http]];
  }

  constructor (private http:Http) {
      this.http = http;
  }

  findAll() {
      return this.http.get(principalURL)
          .map(res => res.json())
          .catch(this.handleError);
   
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
