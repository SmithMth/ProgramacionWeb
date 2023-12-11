import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: import("../users/entities/user.entity").User;
        roles: import("../roles/entities/role.entity").Role[];
        token: string;
    }>;
    register(newUser: CreateUserDto): Promise<import("../users/entities/user.entity").User | import("@nestjs/common").HttpException>;
}
