/* tslint:disable */
/* eslint-disable */
import { Book } from '../models/book';
export interface Feedback {
  book?: Book;
  comment?: string;
  createdAt?: string;
  createdBy?: number;
  id?: number;
  lastModifiedAt?: string;
  lastModifiedBy?: number;
  rate?: number;
}
