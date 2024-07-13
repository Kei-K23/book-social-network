/* tslint:disable */
/* eslint-disable */
import { Book } from '../models/book';
import { BookTransactionHistory } from '../models/book-transaction-history';
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  bio?: string;
  bookTransitionHistories?: Array<BookTransactionHistory>;
  books?: Array<Book>;
  createdAt?: string;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  fullName?: string;
  id?: number;
  lastName?: string;
  name?: string;
  password?: string;
  profilePicture?: string;
  roles?: Array<Role>;
  updatedAt?: string;
  username?: string;
}
