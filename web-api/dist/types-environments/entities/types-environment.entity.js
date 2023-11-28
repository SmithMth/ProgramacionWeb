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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesEnvironment = void 0;
const environment_entity_1 = require("../../environments/entities/environment.entity");
const typeorm_1 = require("typeorm");
let TypesEnvironment = class TypesEnvironment {
};
exports.TypesEnvironment = TypesEnvironment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TypesEnvironment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], TypesEnvironment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TypesEnvironment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => environment_entity_1.Environment, environment => environment.typeEnvironment),
    __metadata("design:type", Array)
], TypesEnvironment.prototype, "environments", void 0);
exports.TypesEnvironment = TypesEnvironment = __decorate([
    (0, typeorm_1.Entity)()
], TypesEnvironment);
//# sourceMappingURL=types-environment.entity.js.map