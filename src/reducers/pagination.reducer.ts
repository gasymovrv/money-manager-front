import { CHANGE_PAGINATION, RESET_PAGINATION } from '../constants';
import { PaginationActionType } from '../interfaces/actions.interface';
import { load } from 'redux-localstorage-simple';
import { PaginationParams } from '../interfaces/main-table.interface';

const state: any = load({states: ['pagination'], namespace: 'money-manager'});

const initialState: Record<string, PaginationParams> = state && state.pagination ? state.pagination : {};

const pagination = (
  state = initialState,
  {type, payload}: PaginationActionType
): Record<string, PaginationParams> => {
  switch (type) {
    case CHANGE_PAGINATION:
    case RESET_PAGINATION: {
      // Expect payload to have accountId and activePaginationOptions
      const { accountId, activePaginationOptions } = payload as { accountId: number, activePaginationOptions: PaginationParams };
      if (!accountId) return state;
      return {
        ...state,
        [accountId]: activePaginationOptions
      };
    }
    default:
      return state;
  }
}

export default pagination;
