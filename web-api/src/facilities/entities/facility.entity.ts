import { IsOptional, IsString, Length } from "class-validator";
import { Environment } from "src/environments/entities/environment.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Facility {
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

    @ManyToMany(() => Environment, environment => environment.facilities)
    environments: Environment[];
}
