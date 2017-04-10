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
      this.http = http;
  }

  findById(id,data) {
        return this.http.get(sessoesURL + id +"/"+ data)
          .map(res => res.json())
          .catch(this.handleError);
   
  }

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
