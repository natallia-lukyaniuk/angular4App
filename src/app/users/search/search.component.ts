import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import {IAppState} from '../../store';
import { CHANGE_FILTER } from '../../actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filterUsers: string = '';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
      this.ngRedux.subscribe(() => this.readState());
      this.readState();
    }

  readState() {
    const state = this.ngRedux.getState();
    this.filterUsers = state.filterUsers;
  }

  ngOnInit() {
  }

  onChangeFilter(e) {
    this.ngRedux.dispatch({type: CHANGE_FILTER, filterUsers: e.target.value});
  }

}
