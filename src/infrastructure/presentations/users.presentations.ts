import { UserRole } from 'src/domain/types';

export interface DisableUsersResponse {
  exceptions: string[];
}

export interface GetUsersResponse {
  results: GetUsersResponseItem[];
  count: number;
}

export interface GetUsersResponseItem {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}
