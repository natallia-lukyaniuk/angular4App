import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() page: number;

  @Output() onPrev = new EventEmitter<boolean>();
  @Output() onNext = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  nextPage() {
    this.onNext.emit();
  }

  prevPage() {
    this.onPrev.emit();
  }
}
