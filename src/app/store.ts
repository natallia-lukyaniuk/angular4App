import { FETCH_USERS } from './actions';
import { UsersService} from './services';
export interface IAppState {
  users: any[];
}

export const INITIAL_STATE: IAppState = {
  users: []
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case FETCH_USERS:
      return {
        users: action.users
      };
  }
  return state;
}
