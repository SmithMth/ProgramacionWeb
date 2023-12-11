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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const typeorm_2 = require("typeorm");
let RolesService = class RolesService {
    constructor(roleRep) {
        this.roleRep = roleRep;
    }
    async create(role) {
        const roleFound = await this.roleRep.findOne({
            where: {
                name: role.name
            }
        });
        if (roleFound) {
            throw new common_1.HttpException('Role with name already exists', common_1.HttpStatus.CONFLICT);
        }
        const newRole = this.roleRep.create(role);
        return await this.roleRep.save(newRole);
    }
    async findAll() {
        return await this.roleRep.find();
    }
    async findOne(id) {
        const roleFound = await this.roleRep.findOne({
            where: {
                id: id,
            }
        });
        if (!roleFound) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        return roleFound;
    }
    update(id, updateRoleDto) {
        return `This action updates a #${id} role`;
    }
    async remove(id) {
        const roleFound = await this.roleRep.findOne({
            where: {
                id: id,
            }
        });
        if (!roleFound) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.roleRep.remove(roleFound);
        }
        catch (error) {
            throw new common_1.HttpException('Error deleting role', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map