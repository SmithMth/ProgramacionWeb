import { CreateTypesEnvironmentDto } from './dto/create-types-environment.dto';
import { UpdateTypesEnvironmentDto } from './dto/update-types-environment.dto';
import { TypesEnvironmentService } from './types-environments.service';
export declare class TypesEnvironmentsController {
    private readonly typesEnvironmentsService;
    constructor(typesEnvironmentsService: TypesEnvironmentService);
    create(createTypesEnvironmentDto: CreateTypesEnvironmentDto): Promise<import("./entities/types-environment.entity").TypesEnvironment>;
    findAll(): Promise<import("./entities/types-environment.entity").TypesEnvironment[]>;
    findOne(id: string): Promise<import("./entities/types-environment.entity").TypesEnvironment>;
    update(id: string, updateTypesEnvironmentDto: UpdateTypesEnvironmentDto): Promise<import("./entities/types-environment.entity").TypesEnvironment>;
    remove(id: string): Promise<void>;
}
