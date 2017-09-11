import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';
import {UsersComponent, UserComponent, UserFormComponent, UsersListComponent, SearchComponent} from './';
import {UsersService, DialogService} from '../services';
import { FormsModule } from '@angular/forms';
import {NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import {IAppState, rootReducer, INITIAL_STATE} from '../store';
import {PopupDirective} from '../popup.directive';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NgReduxModule
  ],
  declarations: [
    usersRouterComponents,
    UserComponent,
    SearchComponent,
    PopupDirective
  ],
  providers: [UsersService, DialogService]
})
export class UsersModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
  ){
    ngRedux.configureStore(rootReducer, INITIAL_STATE, null, devTools.isEnabled() ? [ devTools.enhancer() ] : []);
  }
}
