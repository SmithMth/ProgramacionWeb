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
exports.PeriodsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const period_entity_1 = require("./entities/period.entity");
let PeriodsService = class PeriodsService {
    constructor(periodRepository) {
        this.periodRepository = periodRepository;
    }
    async create(createPeriodDto) {
        const period = new period_entity_1.Period();
        period.startTime = period_entity_1.Time.fromTimeString(createPeriodDto.startTime);
        period.endTime = period_entity_1.Time.fromTimeString(createPeriodDto.endTime);
        return await this.periodRepository.save(period);
    }
    async findAll() {
        return await this.periodRepository.find();
    }
    async findOne(id) {
        const period = await this.periodRepository.findOne({ where: { id } });
        if (!period) {
            throw new common_1.NotFoundException(`Period with ID "${id}" not found`);
        }
        return period;
    }
    async update(id, updatePeriodDto) {
        const period = await this.findOne(id);
        if (updatePeriodDto.startTime) {
            period.startTime = period_entity_1.Time.fromTimeString(updatePeriodDto.startTime);
        }
        if (updatePeriodDto.endTime) {
            period.endTime = period_entity_1.Time.fromTimeString(updatePeriodDto.endTime);
        }
        return await this.periodRepository.save(period);
    }
    async remove(id) {
        const period = await this.findOne(id);
        await this.periodRepository.remove(period);
    }
    async periodStart(start) {
        const period = await this.periodRepository.findOne({
            where: {
                startTimeString: start
            }
        });
        if (!period) {
            throw new common_1.NotFoundException(`Period with start "${start}" not found`);
        }
        return period;
    }
    async periodEnd(end) {
        const period = await this.periodRepository.findOne({
            where: {
                endTimeString: end
            }
        });
        if (!period) {
            throw new common_1.NotFoundException(`Period with end "${end}" not found`);
        }
        return period;
    }
};
exports.PeriodsService = PeriodsService;
exports.PeriodsService = PeriodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(period_entity_1.Period)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PeriodsService);
//# sourceMappingURL=periods.service.js.map