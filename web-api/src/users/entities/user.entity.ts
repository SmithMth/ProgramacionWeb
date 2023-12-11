import { Booking } from "src/bookings/entities/booking.entity"
import { Role } from "src/roles/entities/role.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from "typeorm"

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    username: string

    @Column()
    lastname: string

    @Column()
    password: string

    @OneToMany(() => Booking, booking => booking.environment)
    bookings: Booking[];

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[];
}