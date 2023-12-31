import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
export declare class UsersService {
    private userRep;
    private roleService;
    constructor(userRep: Repository<User>, roleService: RolesService);
    findOneByEmail(email: string): Promise<User>;
    getUserRoles(userId: number): Promise<Role[]>;
    create({ email, username, lastname, password }: CreateUserDto): Promise<User | HttpException>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, user: UpdateUserDto): Promise<HttpException | (User & UpdateUserDto)>;
    remove(id: number): Promise<HttpException | import("typeorm").DeleteResult>;
    login({ email, password }: LoginUserDto): Promise<User>;
    associateUserWithRole(userId: number, roleId: number): Promise<User>;
}
