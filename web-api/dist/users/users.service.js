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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs = require("bcryptjs");
const roles_service_1 = require("../roles/roles.service");
let UsersService = class UsersService {
    constructor(userRep, roleService) {
        this.userRep = userRep;
        this.roleService = roleService;
    }
    async findOneByEmail(email) {
        const userFound = await this.userRep.findOne({
            where: {
                email: email,
            },
        });
        return userFound;
    }
    async getUserRoles(userId) {
        const user = await this.userRep.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.roles;
    }
    async create({ email, username, lastname, password }) {
        const userFound = await this.userRep.findOne({
            where: {
                email: email,
            },
        });
        if (userFound) {
            return new common_1.HttpException('User with email alredy exists', common_1.HttpStatus.CONFLICT);
        }
        const newUser = this.userRep.create({ email, username, lastname, password: await bcryptjs.hash(password, 10) });
        return this.userRep.save(newUser);
    }
    findAll() {
        return this.userRep.find();
    }
    async findOne(id) {
        const userFound = await this.userRep.findOne({ where: { id } });
        if (!userFound) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return userFound;
    }
    async update(id, user) {
        const userFound = await this.userRep.findOne({
            where: {
                id,
            },
        });
        if (!userFound) {
            return new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updateUser = Object.assign(userFound, user);
        return this.userRep.save(updateUser);
    }
    async remove(id) {
        const result = await this.userRep.delete({ id });
        if (result.affected == 0) {
            return new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        else {
            return result;
        }
    }
    async login({ email, password }) {
        const user = await this.userRep.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async associateUserWithRole(userId, roleId) {
        const user = await this.userRep.findOne({ where: { id: userId }, relations: ['roles'] });
        const role = await this.roleService.findOne(roleId);
        if (!user || !role) {
            throw new common_1.NotFoundException('User or role not found');
        }
        const existingRole = user.roles.find(existingRole => existingRole.id === roleId);
        if (!existingRole) {
            user.roles.push(role);
            return this.userRep.save(user);
        }
        else {
            throw new common_1.ConflictException('User already has this role');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        roles_service_1.RolesService])
], UsersService);
//# sourceMappingURL=users.service.js.map