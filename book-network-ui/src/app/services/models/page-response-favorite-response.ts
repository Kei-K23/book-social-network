/* tslint:disable */
/* eslint-disable */
import { FavoriteResponse } from '../models/favorite-response';
export interface PageResponseFavoriteResponse {
  content?: Array<FavoriteResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
