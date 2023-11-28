import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { IsString, IsBoolean, IsNumber, IsOptional, Length } from "class-validator";
import { Facility } from "src/facilities/entities/facility.entity";
import { Booking } from "src/bookings/entities/booking.entity";
import { TypesEnvironment } from "src/types-environments/entities/types-environment.entity";

@Entity()
export class Environment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    @IsString()
    @Length(1, 100)
    name: string;

    @Column({ type: 'text', nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Column()
    @IsNumber()
    capacidad: number;

    @Column({ default: true })
    @IsBoolean()
    asset: boolean;

    @Column()
    @IsBoolean()
    enabled: boolean;

    @OneToMany(() => Booking, booking => booking.environment)
    bookings: Booking[];

    @ManyToOne(() => TypesEnvironment, typeEnvironment => typeEnvironment.environments)
    typeEnvironment: TypesEnvironment;

    @ManyToMany(() => Facility, facility => facility.environments)
    @JoinTable()
    facilities: Facility[];
}