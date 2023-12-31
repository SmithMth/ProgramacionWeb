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
exports.EnvironmentsController = void 0;
const common_1 = require("@nestjs/common");
const create_environment_dto_1 = require("./dto/create-environment.dto");
const update_environment_dto_1 = require("./dto/update-environment.dto");
const environments_service_1 = require("./environments.service");
let EnvironmentsController = class EnvironmentsController {
    constructor(environmentsService) {
        this.environmentsService = environmentsService;
    }
    create(createEnvironmentDto) {
        return this.environmentsService.create(createEnvironmentDto);
    }
    findAll() {
        return this.environmentsService.findAll();
    }
    async findAllWithDetails() {
        return this.environmentsService.findAllWithDetails();
    }
    findOne(id) {
        return this.environmentsService.findOne(+id);
    }
    update(updateEnvironmentDto) {
        return this.environmentsService.update(updateEnvironmentDto);
    }
    remove(id) {
        return this.environmentsService.remove(+id);
    }
};
exports.EnvironmentsController = EnvironmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_environment_dto_1.CreateEnvironmentDto]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('detalle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnvironmentsController.prototype, "findAllWithDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_environment_dto_1.UpdateEnvironmentDto]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvironmentsController.prototype, "remove", null);
exports.EnvironmentsController = EnvironmentsController = __decorate([
    (0, common_1.Controller)('environments'),
    __metadata("design:paramtypes", [environments_service_1.EnvironmentService])
], EnvironmentsController);
//# sourceMappingURL=environments.controller.js.map