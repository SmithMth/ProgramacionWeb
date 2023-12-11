import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}