import { Repository } from 'typeorm';
import { Period } from './entities/period.entity';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
export declare class PeriodsService {
    private readonly periodRepository;
    constructor(periodRepository: Repository<Period>);
    create(createPeriodDto: CreatePeriodDto): Promise<Period>;
    findAll(): Promise<Period[]>;
    findOne(id: number): Promise<Period>;
    update(id: number, updatePeriodDto: UpdatePeriodDto): Promise<Period>;
    remove(id: number): Promise<void>;
}
