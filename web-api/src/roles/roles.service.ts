import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRep: Repository<Role>){}

  async create(role: CreateRoleDto): Promise<Role> {
    const roleFound = await this.roleRep.findOne({
        where: {
            name: role.name
        }
    });
    if (roleFound) {
        throw new HttpException('Role with name already exists', HttpStatus.CONFLICT);
    }
    const newRole = this.roleRep.create(role);
    return await this.roleRep.save(newRole);
}


  async findAll(): Promise<Role[]> {
    return await this.roleRep.find();
  }

  async findOne(id: number): Promise<Role> {
    const roleFound = await this.roleRep.findOne({
        where: {
            id: id,
        }
    });
    if (!roleFound) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return roleFound;
}

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number): Promise<void> {
    const roleFound = await this.roleRep.findOne({
        where: {
            id: id,
        }
    });
    
    if (!roleFound) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    try {
        await this.roleRep.remove(roleFound);
    } catch (error) {
        throw new HttpException('Error deleting role', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
