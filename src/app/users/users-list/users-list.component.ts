import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';

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
  filterUsers: string = '';

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
    this.filterUsers = state.filterUsers;
    this.displayedUsers = this.users.filter(user => user.name.includes(this.filterUsers));
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(resp => {
        this.ngRedux.dispatch({type: 'FETCH_USERS', users: resp});
      })
  }

  addUser() {
    const link = ['users', 'add'];
    this.router.navigate(link);
  }

  deleteUser(user) {
    this.usersService.deleteUser(user)
      .subscribe(() => {
        this.users = this.users.filter(t => t._id !== user._id);
        this.displayedUsers = this.users.filter(user => user.name.toLowerCase().includes(this.filterUsers));
      })
  }

}
