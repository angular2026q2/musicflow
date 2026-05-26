export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto extends SignInDto {
  username: string;
  full_name: string;
}
