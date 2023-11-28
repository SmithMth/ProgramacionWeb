import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Environment } from './entities/environment.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { TypesEnvironmentService } from 'src/types-environments/types-environments.service';
import { FacilitiesService } from 'src/facilities/facilities.service';
import { Facility } from 'src/facilities/entities/facility.entity';
import { CreateFacilityDto } from 'src/facilities/dto/create-facility.dto';

@Injectable()
export class EnvironmentService {
    constructor(
        @InjectRepository(Environment)
        private environmentRepository: Repository<Environment>,
        private serviceTypeEnvironment: TypesEnvironmentService,
        private serviceFacility: FacilitiesService,
    ) { }

    async create(createEnvironmentDto: CreateEnvironmentDto): Promise<Environment> {
        const { typeEnvironment, facilities, ...rest } = createEnvironmentDto;

        const environment = this.environmentRepository.create(rest);

        if (typeEnvironment) {
            const typeEnvironmentRes = await this.serviceTypeEnvironment.findOneName(typeEnvironment.name);
            environment.typeEnvironment = typeEnvironmentRes;
        }

        if (facilities && facilities.length > 0) {
            const existingFacilities: Facility[] = [];
            const newFacilities: CreateFacilityDto[] = [];

            for (const facilityDto of facilities) {
                // Buscar si ya existe una facilidad con el mismo nombre
                const existingFacility = await this.serviceFacility.findOneByName(facilityDto.name);

                if (existingFacility) {
                    // Si existe, asociarla directamente al ambiente
                    existingFacilities.push(existingFacility);
                } else {
                    // Si no existe, agregarla a la lista de nuevas facilidades a crear
                    newFacilities.push(facilityDto);
                }
            }

            // Crear las nuevas facilidades si es necesario
            if (newFacilities.length > 0) {
                const newFacilityEntities = await Promise.all(
                    newFacilities.map(facilityDto => this.serviceFacility.create(facilityDto))
                );

                // Concatenar las nuevas facilidades con las existentes
                environment.facilities = existingFacilities.concat(newFacilityEntities);
                
            } else {
                // Si no hay nuevas facilidades, asignar las existentes directamente
                environment.facilities = existingFacilities;
            }
        }

        console.log(environment)
        return this.environmentRepository.save(environment);
    }



    findAll(): Promise<Environment[]> {
        return this.environmentRepository.find();
    }

    findOne(id: number): Promise<Environment> {
        return this.environmentRepository.findOne({ where: { id } });
    }

    async update(updateEnvironmentDto: UpdateEnvironmentDto){
        const { typeEnvironment, facilities, ...rest } = updateEnvironmentDto;
    
        // Obtener el ambiente existente
        const environment = await this.findOne(rest.id)
    
        // Actualizar los campos simples del ambiente
        Object.assign(environment, rest);
    
        // Actualizar el tipo de ambiente si se proporciona
        if (typeEnvironment) {
            const typeEnvironmentRes = await this.serviceTypeEnvironment.findOneName(typeEnvironment.name);
            environment.typeEnvironment = typeEnvironmentRes;
        }
    
        // Actualizar las facilidades
        if (facilities && facilities.length > 0) {
            const existingFacilities: Facility[] = [];
            const newFacilities: CreateFacilityDto[] = [];
    
            for (const facilityDto of facilities) {
                // Buscar si ya existe una facilidad con el mismo nombre
                const existingFacility = await this.serviceFacility.findOneByName(facilityDto.name);
    
                if (existingFacility) {
                    // Si existe, asociarla directamente al ambiente
                    existingFacilities.push(existingFacility);
                } else {
                    // Si no existe, agregarla a la lista de nuevas facilidades a crear
                    newFacilities.push(facilityDto);
                }
            }
    
            // Crear las nuevas facilidades si es necesario
            if (newFacilities.length > 0) {
                const newFacilityEntities = await Promise.all(
                    newFacilities.map(facilityDto => this.serviceFacility.create(facilityDto))
                );
    
                // Concatenar las nuevas facilidades con las existentes
                environment.facilities = existingFacilities.concat(newFacilityEntities);
            } else {
                // Si no hay nuevas facilidades, asignar las existentes directamente
                environment.facilities = existingFacilities;
            }
        }
    
        // Guardar el ambiente actualizado
        return this.environmentRepository.save(environment);
    }
    

    async remove(id: number): Promise<void> {
        await this.environmentRepository.delete(id);
    }

    async findAllWithDetails(): Promise<Environment[]> {
        return this.environmentRepository.createQueryBuilder('environment')
            .leftJoinAndSelect('environment.typeEnvironment', 'typeEnvironment')
            .leftJoinAndSelect('environment.facilities', 'facilities')
            .getMany();
    }
}
