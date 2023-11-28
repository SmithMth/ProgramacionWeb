import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User | import("@nestjs/common").HttpException>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("@nestjs/common").HttpException | (import("./entities/user.entity").User & UpdateUserDto)>;
    remove(id: string): Promise<import("@nestjs/common").HttpException | import("typeorm").DeleteResult>;
    login(loginUserDto: LoginUserDto): Promise<import("./entities/user.entity").User>;
}
