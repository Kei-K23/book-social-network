/* tslint:disable */
/* eslint-disable */
import { Book } from '../models/book';
import { Role } from '../models/role';
export interface UserResponse {
  bio?: string;
  books?: Array<Book>;
  createdAt?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  profilePicture?: Array<string>;
  roles?: Array<Role>;
  updatedAt?: string;
}
