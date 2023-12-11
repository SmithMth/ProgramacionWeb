import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: CreateUserDto): Promise<import("../users/entities/user.entity").User | import("@nestjs/common").HttpException>;
    login({ email, password }: LoginDto): Promise<{
        user: import("../users/entities/user.entity").User;
        roles: import("../roles/entities/role.entity").Role[];
        token: string;
    }>;
}
