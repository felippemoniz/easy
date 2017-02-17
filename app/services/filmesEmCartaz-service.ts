import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let filmesEmCartazURL = SERVER_URL + 'filmesEmCartaz/';

@Injectable()
export class filmesEmCartazService {


  static get parameters() {
      return [[Http]];
  }

  constructor (private http:Http) {
      this.http = http;
  }

  findAll() {
      console.log('FINDALL')
      return this.http.get(filmesEmCartazURL)
          .map(res => res.json())
          .catch(this.handleError);
   
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
