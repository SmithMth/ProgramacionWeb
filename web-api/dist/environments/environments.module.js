"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentsModule = void 0;
const common_1 = require("@nestjs/common");
const environments_controller_1 = require("./environments.controller");
const environments_service_1 = require("./environments.service");
const environment_entity_1 = require("./entities/environment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const types_environments_module_1 = require("../types-environments/types-environments.module");
const facilities_module_1 = require("../facilities/facilities.module");
let EnvironmentsModule = class EnvironmentsModule {
};
exports.EnvironmentsModule = EnvironmentsModule;
exports.EnvironmentsModule = EnvironmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            facilities_module_1.FacilitiesModule,
            types_environments_module_1.TypesEnvironmentsModule,
            typeorm_1.TypeOrmModule.forFeature([environment_entity_1.Environment])
        ],
        controllers: [environments_controller_1.EnvironmentsController],
        providers: [environments_service_1.EnvironmentService],
        exports: [environments_service_1.EnvironmentService]
    })
], EnvironmentsModule);
//# sourceMappingURL=environments.module.js.map