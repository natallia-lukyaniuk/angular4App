import { FETCH_USERS, CHANGE_FILTER } from './actions';
import { UsersService} from './services';
export interface IAppState {
  users: any[];
  filterUsers: string;
}

export const INITIAL_STATE: IAppState = {
  users: [],
  filterUsers: ''
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case FETCH_USERS:
      return {
        filterUsers: state.filterUsers,
        users: action.users
      };
    case CHANGE_FILTER:
    return {
      filterUsers: action.filterUsers,
      users: state.users
    };
  }
  return state;
}
