import { CHANGE_PAGINATION, RESET_PAGINATION } from '../constants';
import { PaginationActionType } from '../interfaces/actions.interface';
import { PaginationParams } from '../interfaces/main-table.interface';

export const changePagination = (accountId: number, activePaginationOptions: PaginationParams): PaginationActionType => ({
  type: CHANGE_PAGINATION,
  payload: {
    accountId,
    activePaginationOptions,
  },
});

export const resetPagination = (accountId: number, pageSize: number): PaginationActionType => ({
  type: RESET_PAGINATION,
  payload: {
    accountId,
    activePaginationOptions: {page: 0, pageSize}
  },
});
