import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  url: string = 'http://localhost:8000/users';
  users: any[];

  constructor(private http:Http) { }
  getUsers() {
    return this.http.get(this.url)
      .map(resp => resp.json())
  }
  getUser(id) {
    return this.http.get(`${this.url}/${id}`)
    .map(resp => resp.json())
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
            })
  }

  createUser(user) {
    const url = this.url,
        body = JSON.stringify(user),
        headers = new Headers({'Content-Type': 'application/json'}),
        options = new RequestOptions({headers: headers});
    console.log(body);
    return this.http.post(url, body, options)
            .map( response => {
              console.log(response);
              return response.json()
             } );
  }

  deleteUser(user) {
    const url = `${this.url}/${user._id}`;

    return this.http.delete(url)
            .map( response => response.json())
  }
}
