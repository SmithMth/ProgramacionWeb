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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const environments_service_1 = require("../environments/environments.service");
const users_service_1 = require("../users/users.service");
const periods_service_1 = require("../periods/periods.service");
let BookingsService = class BookingsService {
    constructor(bookingRepository, serviceUser, serviceEnvironment, servicePeriod) {
        this.bookingRepository = bookingRepository;
        this.serviceUser = serviceUser;
        this.serviceEnvironment = serviceEnvironment;
        this.servicePeriod = servicePeriod;
    }
    async create(bookingDto) {
        const { environmentId, userId, ...bookingData } = bookingDto;
        const environment = await this.serviceEnvironment.findOne(environmentId);
        const user = await this.serviceUser.findOne(userId);
        const periodoInicial = await this.servicePeriod.periodStart(bookingData.startTime);
        const periodoFinal = await this.servicePeriod.periodEnd(bookingData.endTime);
        const existingBookings = await this.bookingRepository.find({
            where: {
                environment: { id: environment.id },
                period: {
                    id: (0, typeorm_2.Between)(periodoInicial.id, periodoFinal.id),
                },
            },
        });
        if (existingBookings.length > 0) {
            throw new common_1.ConflictException('Ya existen reservas en el período de tiempo especificado.');
        }
        const bookings = [];
        for (let id = periodoInicial.id; id <= periodoFinal.id; id++) {
            const periodo = await this.servicePeriod.findOne(id);
            const booking = this.bookingRepository.create({
                ...bookingData,
                environment,
                user,
                period: periodo,
            });
            bookings.push(booking);
        }
        return this.bookingRepository.save(bookings);
    }
    async findAll() {
        const bookings = await this.bookingRepository.find({
            relations: ['user', 'period', 'environment'],
        });
        return bookings;
    }
    findOne(id) {
        return this.bookingRepository.findOne({ where: { id } });
    }
    async update(id, updateBookingDto) {
        await this.bookingRepository.update(id, updateBookingDto);
        return this.bookingRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.bookingRepository.delete(id);
    }
    async setActive({ id, isActive }) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        booking.isActive = isActive;
        return this.bookingRepository.save(booking);
    }
    async setAccepted({ id, isAccepted }) {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        booking.isAccepted = isAccepted;
        return this.bookingRepository.save(booking);
    }
    async getBookingsByUser(userId) {
        const bookings = await this.bookingRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'period', 'environment'],
        });
        if (!bookings) {
            throw new common_1.NotFoundException('No bookings found for the user');
        }
        return bookings;
    }
    async getUnacceptedBookings() {
        const unacceptedBookings = await this.bookingRepository.find({
            where: { isAccepted: false },
            relations: ['user', 'period', 'environment'],
        });
        return unacceptedBookings;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        environments_service_1.EnvironmentService,
        periods_service_1.PeriodsService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map