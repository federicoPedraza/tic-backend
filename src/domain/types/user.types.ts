export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export type AccessToken = {
  access_token: string;
};

export type AccessTokenPayload = {
  id: string;
  role: UserRole;
  email: string;
};
