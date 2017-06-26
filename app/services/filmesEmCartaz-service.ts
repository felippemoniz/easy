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

  findAll(filtro) {
      return this.http.get(filmesEmCartazURL+filtro)
          .map(res => res.json())
          .catch(this.handleError);

  }


  getTop6() {
      return this.http.get(SERVER_URL + "topFilmes/")
          .map(res => res.json())
          .catch(this.handleError);

  }


/*        var url = 'https://api-content.ingresso.com/v0/templates/soon/'+cidade;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
*/

  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
