import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User | import("@nestjs/common").HttpException>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("@nestjs/common").HttpException | (User & UpdateUserDto)>;
    remove(id: string): Promise<import("@nestjs/common").HttpException | import("typeorm").DeleteResult>;
    login(loginUserDto: LoginUserDto): Promise<User>;
    associateUserWithRole(userId: number, roleId: number): Promise<User>;
}
