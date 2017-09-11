import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent, UserFormComponent, UsersListComponent } from './';
import { UserResolveGuard }   from './../guards/user-resolve.guard';
import { CanDeactivateGuard }    from './../guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersListComponent,
      },
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: ':id',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserResolveGuard
        }
      },
    ]
  },
];

export let usersRouterComponents = [UsersComponent, UserFormComponent, UsersListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    UserResolveGuard,
    CanDeactivateGuard
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
