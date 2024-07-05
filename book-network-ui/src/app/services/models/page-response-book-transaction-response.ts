/* tslint:disable */
/* eslint-disable */
import { BookTransactionResponse } from '../models/book-transaction-response';
export interface PageResponseBookTransactionResponse {
  content?: Array<BookTransactionResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
