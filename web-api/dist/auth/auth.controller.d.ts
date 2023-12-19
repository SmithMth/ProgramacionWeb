import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginUserDto): any;
    register(newUser: CreateUserDto): Promise<import("../users/entities/user.entity").User | import("@nestjs/common").HttpException>;
}
