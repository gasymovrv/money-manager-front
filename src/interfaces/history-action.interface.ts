import { Operation, OperationCategory } from './operation.interface';

export interface HistoryActionDto {
  id: number;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE';
  operationType: 'INCOME' | 'EXPENSE';
  oldOperation?: Operation;
  newOperation?: Operation;
  modifiedAt: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
