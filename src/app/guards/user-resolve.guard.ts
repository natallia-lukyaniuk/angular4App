import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable }    from 'rxjs/Observable';
import { User } from '../models';
import { UsersService } from '../services';

@Injectable()
export class UserResolveGuard implements Resolve<User> {
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.params['id'];

    return this.usersService.getUser(id);
  }
}
