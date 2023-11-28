import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnvironmentService } from './environments.service';
import { Environment } from './entities/environment.entity';
export declare class EnvironmentsController {
    private readonly environmentsService;
    constructor(environmentsService: EnvironmentService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<Environment>;
    findAll(): Promise<Environment[]>;
    findAllWithDetails(): Promise<Environment[]>;
    findOne(id: string): Promise<Environment>;
    update(updateEnvironmentDto: UpdateEnvironmentDto): Promise<Environment>;
    remove(id: string): Promise<void>;
}
