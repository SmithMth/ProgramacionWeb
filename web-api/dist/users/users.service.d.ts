import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from 'src/roles/entities/role.entity';
export declare class UsersService {
    private userRep;
    constructor(userRep: Repository<User>);
    findOneByEmail(email: string): Promise<User>;
    getUserRoles(userId: number): Promise<Role[]>;
    create({ email, username, lastname, password }: CreateUserDto): Promise<User | HttpException>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, user: UpdateUserDto): Promise<HttpException | (User & UpdateUserDto)>;
    remove(id: number): Promise<import("typeorm").DeleteResult | HttpException>;
    login({ email, password }: LoginUserDto): Promise<User>;
}
