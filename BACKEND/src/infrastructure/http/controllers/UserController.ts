import { Request, Response } from "express";
import { CreateUserDTO } from "../../http/dtos/requests/user.dto";
import { UpdateUserDTO } from  "../../http/dtos/requests/user.dto";
import { LoginUserDTO } from  "../../http/dtos/requests/user.dto";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserUseCase } from "../../../core/usecases/user/CreateUser";
import { GetAllUsersUseCase } from "../../../core/usecases/user/GetAllUsers";
import { GetUserByIdUseCase } from "../../../core/usecases/user/GetUserById";
import { UpdateUserUseCase } from "../../../core/usecases/user/UpdateUser";
import { DeleteUserUseCase } from "../../../core/usecases/user/DeleteUser";
import { UserMapper } from "../../http/mappers/UserMapper";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { generateToken } from "../../../shared/utils/auth";
import { LoginUser } from "../../../core/usecases/user/LoginUser";

const userRepo = new UserRepository();

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const dto: CreateUserDTO = req.body;
      
      const useCase = new CreateUserUseCase(userRepo);
      const user = await useCase.execute(dto);

      const token = generateToken({ id: user.id, email: user.email });
      
      return res.status(201).json(UserMapper.toDTOWithToken(user, token));
    } catch (err: any) {
      return res.status(400).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const dto: LoginUserDTO = req.body;
      console.log('Raw login request:', JSON.stringify(dto)); 
      
      const useCase = new LoginUser(userRepo);
      const user = await useCase.execute(dto);

      const token = generateToken({ id: user.id, email: user.email });
      
      return res.json(UserMapper.toDTOWithToken(user, token));
    } catch (err: any) {
      console.error('Login error details:', err); 
      return res.status(401).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
}

  static async getUser(req: Request, res: Response) {
    try {
      const useCase = new GetUserByIdUseCase(userRepo);
      const user = await useCase.execute(req.params.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      return res.json(UserMapper.toDTO(user));
    } catch (err: any) {
      return res.status(404).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const useCase = new GetAllUsersUseCase(userRepo);
      const users = await useCase.execute();
      
      return res.json({
        users: UserMapper.toDTOList(users),
        total: users.length
      });
    } catch (err: any) {
      return res.status(500).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const dto: UpdateUserDTO = {
        id: req.params.id,
        ...req.body
      };

      // Ensure all required User fields are present and not undefined
      if (!dto.name) {
        return res.status(400).json({ error: "Name is required" });
      }
      if (!dto.email) {
        return res.status(400).json({ error: "Email is required" });
      }
      // Add other required fields as needed

      const userObj = {
        id: dto.id,
        name: dto.name,
        email: dto.email,
        password: dto.password ?? "", 
      };

      const useCase = new UpdateUserUseCase(userRepo);
      const user = await useCase.execute(userObj);

      return res.json(UserMapper.toDTO(user));
    } catch (err: any) {
      const status = err instanceof BusinessError && err.errorCode === 'USER_NOT_FOUND' ? 404 : 400;
      return res.status(status).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const useCase = new DeleteUserUseCase(userRepo);
      await useCase.execute(req.params.id);
      
      return res.status(204).send();
    } catch (err: any) {
      return res.status(404).json({ 
        error: err.message,
        ...(err instanceof BusinessError && { errorCode: err.errorCode })
      });
    }
  }
}