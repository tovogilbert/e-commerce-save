export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}