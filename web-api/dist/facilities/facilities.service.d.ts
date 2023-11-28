import { Repository } from 'typeorm';
import { Facility } from './entities/facility.entity';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
export declare class FacilitiesService {
    private readonly facilityRepository;
    constructor(facilityRepository: Repository<Facility>);
    create(createFacilityDto: CreateFacilityDto): Promise<Facility>;
    findAll(): Promise<Facility[]>;
    findOne(id: number): Promise<Facility>;
    findOneByName(name: string): Promise<Facility>;
    update(id: number, updateFacilityDto: UpdateFacilityDto): Promise<Facility>;
    remove(id: number): Promise<void>;
}
