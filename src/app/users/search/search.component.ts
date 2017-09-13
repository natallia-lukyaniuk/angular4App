import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgRedux } from 'ng2-redux';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() search: string;
  @Output() changeFilter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onChangeFilter(e) {
    if (e.keyCode === 13 || e.target.type === 'button') {
      this.changeFilter.emit(this.search);
    }
  }

}
