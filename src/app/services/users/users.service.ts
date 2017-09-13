import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  url = 'http://localhost:4000/users';
  users: any[];

  constructor(private http: Http) { }
  getUsers(limit, offset, search) {
    const url = `${this.url}?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url)
      .map(resp => {
        return resp.json();
      });
  }
  getUser(id) {
    return this.http.get(`${this.url}/${id}`)
    .map(resp => resp.json());
  }

  editUser(user) {
    const url = `${this.url}/${user._id}`,
        body = JSON.stringify(user),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions();
    options.headers = headers;

    return this.http.put(url, body, options)
            .map( response => {
              return response.json();
            });
  }

  createUser(user) {
    const url = this.url,
        body = JSON.stringify(user),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options)
            .map( response => {
              return response.json();
             } );
  }

  deleteUser(user) {
    const url = `${this.url}/${user._id}`;

    return this.http.delete(url)
            .map( response => response.json());
  }
}
