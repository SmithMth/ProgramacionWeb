import { Repository } from 'typeorm';
import { Environment } from './entities/environment.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { TypesEnvironmentService } from 'src/types-environments/types-environments.service';
import { FacilitiesService } from 'src/facilities/facilities.service';
export declare class EnvironmentService {
    private environmentRepository;
    private serviceTypeEnvironment;
    private serviceFacility;
    constructor(environmentRepository: Repository<Environment>, serviceTypeEnvironment: TypesEnvironmentService, serviceFacility: FacilitiesService);
    create(createEnvironmentDto: CreateEnvironmentDto): Promise<Environment>;
    findAll(): Promise<Environment[]>;
    findOne(id: number): Promise<Environment>;
    update(updateEnvironmentDto: UpdateEnvironmentDto): Promise<Environment>;
    remove(id: number): Promise<void>;
    findAllWithDetails(): Promise<Environment[]>;
}
