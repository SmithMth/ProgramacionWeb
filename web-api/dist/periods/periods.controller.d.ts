import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
export declare class PeriodsController {
    private readonly periodsService;
    constructor(periodsService: PeriodsService);
    create(createPeriodDto: CreatePeriodDto): Promise<import("./entities/period.entity").Period>;
    findAll(): Promise<import("./entities/period.entity").Period[]>;
    findOne(id: string): Promise<import("./entities/period.entity").Period>;
    update(id: string, updatePeriodDto: UpdatePeriodDto): Promise<import("./entities/period.entity").Period>;
    remove(id: string): Promise<void>;
}
