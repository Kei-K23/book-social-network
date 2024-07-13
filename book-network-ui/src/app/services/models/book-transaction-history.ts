/* tslint:disable */
/* eslint-disable */
import { Book } from '../models/book';
import { User } from '../models/user';
export interface BookTransactionHistory {
  book?: Book;
  createdAt?: string;
  createdBy?: number;
  id?: number;
  lastModifiedAt?: string;
  lastModifiedBy?: number;
  returnApprove?: boolean;
  returned?: boolean;
  user?: User;
}
