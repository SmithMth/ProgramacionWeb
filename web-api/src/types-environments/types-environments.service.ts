import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypesEnvironment } from './entities/types-environment.entity';
import { CreateTypesEnvironmentDto } from './dto/create-types-environment.dto';
import { UpdateTypesEnvironmentDto } from './dto/update-types-environment.dto';

@Injectable()
export class TypesEnvironmentService {
    constructor(
        @InjectRepository(TypesEnvironment)
        private typesEnvironmentRepository: Repository<TypesEnvironment>,
    ) {}

    async create(createTypesEnvironmentDto: CreateTypesEnvironmentDto): Promise<TypesEnvironment> {
        const typesEnvironment = this.typesEnvironmentRepository.create(createTypesEnvironmentDto);
        return this.typesEnvironmentRepository.save(typesEnvironment);
    }

    findAll(): Promise<TypesEnvironment[]> {
        return this.typesEnvironmentRepository.find();
    }

    findOne(id: number): Promise<TypesEnvironment> {
        return this.typesEnvironmentRepository.findOne({where:{id: id}});
    }

    findOneName(name: string): Promise<TypesEnvironment> {
        console.log("Nombre:",name)
        return this.typesEnvironmentRepository.findOne({where:{name: name}});
    }

    async update(id: number, updateTypesEnvironmentDto: UpdateTypesEnvironmentDto): Promise<TypesEnvironment> {
        await this.typesEnvironmentRepository.update(id, updateTypesEnvironmentDto);
        return this.typesEnvironmentRepository.findOne({where:{id}});
    }

    async remove(id: number): Promise<void> {
        await this.typesEnvironmentRepository.delete(id);
    }
}
