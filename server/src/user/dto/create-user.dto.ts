export class CreateUserDTO {
  readonly username: string;
  readonly password: string;
  readonly mail: string;
}

export class LoginUserDTO {
  readonly username?: string;
  readonly mail?: string;
  readonly password: string;
  
}
