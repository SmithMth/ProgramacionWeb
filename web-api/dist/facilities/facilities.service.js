"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const facility_entity_1 = require("./entities/facility.entity");
let FacilitiesService = class FacilitiesService {
    constructor(facilityRepository) {
        this.facilityRepository = facilityRepository;
    }
    async create(createFacilityDto) {
        const facility = this.facilityRepository.create(createFacilityDto);
        return await this.facilityRepository.save(facility);
    }
    async findAll() {
        return await this.facilityRepository.find();
    }
    async findOne(id) {
        const facility = await this.facilityRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!facility) {
            throw new common_1.NotFoundException(`Facility with ID "${id}" not found`);
        }
        return facility;
    }
    async findOneByName(name) {
        const facility = await this.facilityRepository.findOne({
            where: {
                name: name,
            },
        });
        if (!facility) {
            throw new common_1.NotFoundException(`Facility with ID "${name}" not found`);
        }
        return facility;
    }
    async update(id, updateFacilityDto) {
        const facility = await this.findOne(id);
        this.facilityRepository.merge(facility, updateFacilityDto);
        return await this.facilityRepository.save(facility);
    }
    async remove(id) {
        const facility = await this.findOne(id);
        await this.facilityRepository.remove(facility);
    }
};
exports.FacilitiesService = FacilitiesService;
exports.FacilitiesService = FacilitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(facility_entity_1.Facility)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacilitiesService);
//# sourceMappingURL=facilities.service.js.map