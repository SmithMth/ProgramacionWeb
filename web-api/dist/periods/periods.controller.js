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
exports.PeriodsController = void 0;
const common_1 = require("@nestjs/common");
const periods_service_1 = require("./periods.service");
const create_period_dto_1 = require("./dto/create-period.dto");
const update_period_dto_1 = require("./dto/update-period.dto");
let PeriodsController = class PeriodsController {
    constructor(periodsService) {
        this.periodsService = periodsService;
    }
    create(createPeriodDto) {
        return this.periodsService.create(createPeriodDto);
    }
    findAll() {
        return this.periodsService.findAll();
    }
    findOne(id) {
        return this.periodsService.findOne(+id);
    }
    update(id, updatePeriodDto) {
        return this.periodsService.update(+id, updatePeriodDto);
    }
    remove(id) {
        return this.periodsService.remove(+id);
    }
};
exports.PeriodsController = PeriodsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_period_dto_1.CreatePeriodDto]),
    __metadata("design:returntype", void 0)
], PeriodsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PeriodsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeriodsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_period_dto_1.UpdatePeriodDto]),
    __metadata("design:returntype", void 0)
], PeriodsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeriodsController.prototype, "remove", null);
exports.PeriodsController = PeriodsController = __decorate([
    (0, common_1.Controller)('periods'),
    __metadata("design:paramtypes", [periods_service_1.PeriodsService])
], PeriodsController);
//# sourceMappingURL=periods.controller.js.map