import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user;
  @Output() deleteUser = new EventEmitter<any>();
  color: string = 'yellow';

  constructor(
    private router: Router
  ) { }

  moreInf() {
    const link = ['/users', this.user._id];
    this.router.navigate(link);
  }

  ngOnInit() {
  }

  deleteUserHandler() {
    this.deleteUser.emit(this.user);
  }

}
