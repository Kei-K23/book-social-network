/* tslint:disable */
/* eslint-disable */
import { BookTransactionHistory } from '../models/book-transaction-history';
import { Feedback } from '../models/feedback';
import { User } from '../models/user';
export interface Book {
  archived?: boolean;
  author?: string;
  bookTransitionHistories?: Array<BookTransactionHistory>;
  coverImage?: string;
  createdAt?: string;
  createdBy?: number;
  feedbacks?: Array<Feedback>;
  id?: number;
  isbn?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: number;
  owner?: User;
  rates?: number;
  shareable?: boolean;
  synopsis?: string;
  title?: string;
}
