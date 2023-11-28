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
exports.EnvironmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const environment_entity_1 = require("./entities/environment.entity");
const types_environments_service_1 = require("../types-environments/types-environments.service");
const facilities_service_1 = require("../facilities/facilities.service");
let EnvironmentService = class EnvironmentService {
    constructor(environmentRepository, serviceTypeEnvironment, serviceFacility) {
        this.environmentRepository = environmentRepository;
        this.serviceTypeEnvironment = serviceTypeEnvironment;
        this.serviceFacility = serviceFacility;
    }
    async create(createEnvironmentDto) {
        const { typeEnvironment, facilities, ...rest } = createEnvironmentDto;
        const environment = this.environmentRepository.create(rest);
        if (typeEnvironment) {
            const typeEnvironmentRes = await this.serviceTypeEnvironment.findOneName(typeEnvironment.name);
            environment.typeEnvironment = typeEnvironmentRes;
        }
        if (facilities && facilities.length > 0) {
            const existingFacilities = [];
            const newFacilities = [];
            for (const facilityDto of facilities) {
                const existingFacility = await this.serviceFacility.findOneByName(facilityDto.name);
                if (existingFacility) {
                    existingFacilities.push(existingFacility);
                }
                else {
                    newFacilities.push(facilityDto);
                }
            }
            if (newFacilities.length > 0) {
                const newFacilityEntities = await Promise.all(newFacilities.map(facilityDto => this.serviceFacility.create(facilityDto)));
                environment.facilities = existingFacilities.concat(newFacilityEntities);
            }
            else {
                environment.facilities = existingFacilities;
            }
        }
        console.log(environment);
        return this.environmentRepository.save(environment);
    }
    findAll() {
        return this.environmentRepository.find();
    }
    findOne(id) {
        return this.environmentRepository.findOne({ where: { id } });
    }
    async update(updateEnvironmentDto) {
        const { typeEnvironment, facilities, ...rest } = updateEnvironmentDto;
        const environment = await this.findOne(rest.id);
        Object.assign(environment, rest);
        if (typeEnvironment) {
            const typeEnvironmentRes = await this.serviceTypeEnvironment.findOneName(typeEnvironment.name);
            environment.typeEnvironment = typeEnvironmentRes;
        }
        if (facilities && facilities.length > 0) {
            const existingFacilities = [];
            const newFacilities = [];
            for (const facilityDto of facilities) {
                const existingFacility = await this.serviceFacility.findOneByName(facilityDto.name);
                if (existingFacility) {
                    existingFacilities.push(existingFacility);
                }
                else {
                    newFacilities.push(facilityDto);
                }
            }
            if (newFacilities.length > 0) {
                const newFacilityEntities = await Promise.all(newFacilities.map(facilityDto => this.serviceFacility.create(facilityDto)));
                environment.facilities = existingFacilities.concat(newFacilityEntities);
            }
            else {
                environment.facilities = existingFacilities;
            }
        }
        return this.environmentRepository.save(environment);
    }
    async remove(id) {
        await this.environmentRepository.delete(id);
    }
    async findAllWithDetails() {
        return this.environmentRepository.createQueryBuilder('environment')
            .leftJoinAndSelect('environment.typeEnvironment', 'typeEnvironment')
            .leftJoinAndSelect('environment.facilities', 'facilities')
            .getMany();
    }
};
exports.EnvironmentService = EnvironmentService;
exports.EnvironmentService = EnvironmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(environment_entity_1.Environment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        types_environments_service_1.TypesEnvironmentService,
        facilities_service_1.FacilitiesService])
], EnvironmentService);
//# sourceMappingURL=environments.service.js.map