import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from './entities/facility.entity';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async create(createFacilityDto: CreateFacilityDto): Promise<Facility> {
    const facility = this.facilityRepository.create(createFacilityDto);
    return await this.facilityRepository.save(facility);
  }

  async findAll(): Promise<Facility[]> {
    return await this.facilityRepository.find();
  }

  async findOne(id: number): Promise<Facility> {
    const facility = await this.facilityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!facility) {
      throw new NotFoundException(`Facility with ID "${id}" not found`);
    }
    return facility;
  }

  async findOneByName(name: string) {
    const facility = await this.facilityRepository.findOne({
      where: {
        name: name,
      },
    });
    if (!facility) {
      throw new NotFoundException(`Facility with ID "${name}" not found`);
    }
    return facility;
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto): Promise<Facility> {
    const facility = await this.findOne(id); // Reutiliza findOne para obtener la facilidad y manejar la excepción
    this.facilityRepository.merge(facility, updateFacilityDto);
    return await this.facilityRepository.save(facility);
  }

  async remove(id: number): Promise<void> {
    const facility = await this.findOne(id); // Asegúrate de que la facilidad existe antes de intentar eliminarla
    await this.facilityRepository.remove(facility);
  }
}
