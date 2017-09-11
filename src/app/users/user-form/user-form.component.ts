import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable }    from 'rxjs/Observable';

import { UsersService, DialogService } from '../../services';
import {User, Address} from '../../models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User;
  originalUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UsersService: UsersService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.user) {
        this.user = Object.assign({}, data.user);
        this.originalUser = Object.assign({}, data.user);
      } else {        
        this.user = new User(null, '', '', '', null,  '', new Address('', '', null));
      }
    });
  }

  goBack() {
    const link = ['/users'];
    this.router.navigate(link);
  }

  saveUser() {
    const user = new User(
      this.user._id,
      this.user.name,
      this.user.username,
      this.user.email,
      this.user.phone,
      this.user.website,
      new Address(
        this.user.address.city,
        this.user.address.street,
        this.user.address.zipcode
      )
    );

    let method = this.user._id ? 'editUser' : 'createUser';
    this.UsersService[method](user)
      .subscribe(() => {
        this.goBack();
        this.originalUser = Object.assign({}, this.user);
      });
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.originalUser || this.originalUser.name === this.user.name) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }

}
