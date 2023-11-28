"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesEnvironmentsModule = void 0;
const common_1 = require("@nestjs/common");
const types_environments_controller_1 = require("./types-environments.controller");
const typeorm_1 = require("@nestjs/typeorm");
const types_environment_entity_1 = require("./entities/types-environment.entity");
const types_environments_service_1 = require("./types-environments.service");
let TypesEnvironmentsModule = class TypesEnvironmentsModule {
};
exports.TypesEnvironmentsModule = TypesEnvironmentsModule;
exports.TypesEnvironmentsModule = TypesEnvironmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([types_environment_entity_1.TypesEnvironment])
        ],
        controllers: [types_environments_controller_1.TypesEnvironmentsController],
        providers: [types_environments_service_1.TypesEnvironmentService],
        exports: [types_environments_service_1.TypesEnvironmentService]
    })
], TypesEnvironmentsModule);
//# sourceMappingURL=types-environments.module.js.map