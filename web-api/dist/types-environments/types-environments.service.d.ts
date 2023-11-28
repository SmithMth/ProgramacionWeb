import { Repository } from 'typeorm';
import { TypesEnvironment } from './entities/types-environment.entity';
import { CreateTypesEnvironmentDto } from './dto/create-types-environment.dto';
import { UpdateTypesEnvironmentDto } from './dto/update-types-environment.dto';
export declare class TypesEnvironmentService {
    private typesEnvironmentRepository;
    constructor(typesEnvironmentRepository: Repository<TypesEnvironment>);
    create(createTypesEnvironmentDto: CreateTypesEnvironmentDto): Promise<TypesEnvironment>;
    findAll(): Promise<TypesEnvironment[]>;
    findOne(id: number): Promise<TypesEnvironment>;
    findOneName(name: string): Promise<TypesEnvironment>;
    update(id: number, updateTypesEnvironmentDto: UpdateTypesEnvironmentDto): Promise<TypesEnvironment>;
    remove(id: number): Promise<void>;
}
