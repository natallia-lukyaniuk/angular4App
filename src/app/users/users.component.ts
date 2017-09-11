import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';

import {IAppState} from '../store';
import { FETCH_USERS } from '../actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  ngOnInit() {}

}
