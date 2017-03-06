import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let sessoesURL = SERVER_URL + 'sessoes/';

@Injectable()
export class sessoesService {


  static get parameters() {
      return [[Http]];
  }

  constructor (private http:Http) {
    console.log('oi');
      this.http = http;
  }

  findAll() {
      console.log('FINDALL SESSOES')
      return this.http.get(sessoesURL)
          .map(res => res.json())
          .catch(this.handleError);
   
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
