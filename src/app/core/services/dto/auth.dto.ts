export interface SignInDto {
  identifier: string;
  password: string;
}

export interface SignUpDto {
  full_name: string | null;
  username: string;
  email: string;
  password: string;
}
