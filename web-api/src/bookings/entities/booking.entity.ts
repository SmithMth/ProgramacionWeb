import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsString, IsDate } from "class-validator";
import { Environment } from "src/environments/entities/environment.entity";
import { User } from "src/users/entities/user.entity";
import { Period } from "src/periods/entities/period.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    affair: string;

    @Column()
    @IsDate()
    fecha: Date;

    @ManyToOne(() => Environment, environment => environment.bookings)
    environment: Environment;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Period, period => period.bookings)
    period: Period;
}
