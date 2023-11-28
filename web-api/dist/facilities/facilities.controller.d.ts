import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
export declare class FacilitiesController {
    private readonly facilitiesService;
    constructor(facilitiesService: FacilitiesService);
    create(createFacilityDto: CreateFacilityDto): Promise<import("./entities/facility.entity").Facility>;
    findAll(): Promise<import("./entities/facility.entity").Facility[]>;
    findOne(id: string): Promise<import("./entities/facility.entity").Facility>;
    update(id: string, updateFacilityDto: UpdateFacilityDto): Promise<import("./entities/facility.entity").Facility>;
    remove(id: string): Promise<void>;
}
