import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }

  @Patch('setActive/:id')
  setActive(@Param('id') id: string, @Body() setActiveDto: { isActive: boolean }) {
    return this.bookingsService.setActive({ id: +id, isActive: setActiveDto.isActive });
  }

  @Patch('setAccepted/:id')
  setAccepted(@Param('id') id: string, @Body() setAcceptedDto: { isAccepted: boolean }) {
    return this.bookingsService.setAccepted({ id: +id, isAccepted: setAcceptedDto.isAccepted });
  }

  @Get('getBookingsByUser/:userId')
  getBookingsByUser(@Param('userId') userId: string) {
    return this.bookingsService.getBookingsByUser(+userId);
  }

  @Get('getUnacceptedBookings')
  getUnacceptedBookings() {
    return this.bookingsService.getUnacceptedBookings();
  }
}
