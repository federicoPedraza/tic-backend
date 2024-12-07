import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignupDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}

export class DisableUserDTO {
  @IsNotEmpty()
  targets: string[];
}
