import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private roleRep;
    constructor(roleRep: Repository<Role>);
    create(role: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    remove(id: number): Promise<void>;
}
