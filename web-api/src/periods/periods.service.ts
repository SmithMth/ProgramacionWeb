import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Period, Time } from './entities/period.entity';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>,
  ) { }

  async create(createPeriodDto: CreatePeriodDto): Promise<Period> {
    const period = new Period();
    period.startTime = Time.fromTimeString(createPeriodDto.startTime);
    period.endTime = Time.fromTimeString(createPeriodDto.endTime);
    return await this.periodRepository.save(period);
  }



  async findAll(): Promise<Period[]> {
    return await this.periodRepository.find();
  }

  async findOne(id: number): Promise<Period> {
    const period = await this.periodRepository.findOne({ where: { id } });
    if (!period) {
      throw new NotFoundException(`Period with ID "${id}" not found`);
    }
    return period;
  }


  async update(id: number, updatePeriodDto: UpdatePeriodDto): Promise<Period> {
    const period = await this.findOne(id);
    if (updatePeriodDto.startTime) {
      period.startTime = Time.fromTimeString(updatePeriodDto.startTime);
    }
    if (updatePeriodDto.endTime) {
      period.endTime = Time.fromTimeString(updatePeriodDto.endTime);
    }
    return await this.periodRepository.save(period);
  }


  async remove(id: number): Promise<void> {
    const period = await this.findOne(id); // Asegúrate de que el periodo existe antes de intentar eliminarlo
    await this.periodRepository.remove(period);
  }

  async periodStart(start: string){
    const period = await this.periodRepository.findOne({
      where: {
        startTimeString: start
      }
    });
    if (!period) {
      throw new NotFoundException(`Period with start "${start}" not found`);
    }
    return period
  }

  async periodEnd(end: string){
    const period = await this.periodRepository.findOne({
      where: {
        endTimeString: end
      }
    });
    if (!period) {
      throw new NotFoundException(`Period with end "${end}" not found`);
    }
    return period
  }
}  
