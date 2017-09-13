import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import {IAppState} from '../../store';
import { FETCH_USERS } from '../../actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
  users: any[];
  displayedUsers: any[];
  filterUsers = '';
  totalCount: number;
  page = 1;
  limit = 10;
  offset: number;
  unsub: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private ngRedux: NgRedux<IAppState>
    ) {
      this.ngRedux.subscribe(() => this.readState());
      this.readState();
    }

  readState() {
    const state = this.ngRedux.getState();
    this.users = state.users;
  }

  ngOnInit() {
    this.offset = (this.page - 1) * this.limit;
    this.unsub = this.usersService.getUsers(this.limit, this.offset, this.filterUsers)
      .subscribe(resp => {
          this.totalCount = resp.total;
          this.ngRedux.dispatch({type: 'FETCH_USERS', users: resp.users});
        });
  }

  addUser() {
    const link = ['users', 'add'];
    this.router.navigate(link);
  }

  deleteUser(user) {
    this.usersService.deleteUser(user)
      .subscribe(() => {
        this.users = this.users.filter(t => t._id !== user._id);
      });
  }

  nextPage() {
    this.unsub.unsubscribe();
    this.page = this.page + 1;
    // this.offset = (this.page - 1) * this.limit;
    this.offset += this.limit;
    this.unsub = this.usersService.getUsers(this.limit, this.offset, this.filterUsers)
      .subscribe(resp => {
          this.totalCount = resp.total;
          this.ngRedux.dispatch({type: 'FETCH_USERS', users: resp.users});
      });
  }

  prevPage() {
    this.unsub.unsubscribe();
    this.page = this.page - 1;
    this.offset -= this.limit;
    this.unsub = this.usersService.getUsers(this.limit, this.offset, this.filterUsers)
      .subscribe(resp => {
          this.totalCount = resp.total;
          this.ngRedux.dispatch({type: 'FETCH_USERS', users: resp.users});
      });
  }

  changeFilter(search) {
    this.filterUsers = search;
    this.unsub.unsubscribe();
    this.offset = 0;
    this.unsub = this.usersService.getUsers(this.limit, this.offset, this.filterUsers)
      .subscribe(resp => {
          this.totalCount = resp.total;
          this.ngRedux.dispatch({type: 'FETCH_USERS', users: resp.users});
      });
  }

}
