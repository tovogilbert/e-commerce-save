export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithTokenResponseDTO extends UserResponseDTO {
  token: string;
}

export interface UserListResponseDTO {
  users: UserResponseDTO[];
  total: number;
}