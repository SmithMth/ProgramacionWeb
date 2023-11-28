import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private userRep: Repository<User>
  ) { }

  async create({ email, username, lastname, password }: CreateUserDto) {
    const userFound = await this.userRep.findOne({
      where: {
        email: email,
      },
    });
    if (userFound) {
      return new HttpException('User with email alredy exists', HttpStatus.CONFLICT);
    }
    const newUser = this.userRep.create({ email, username, lastname, password: await bcryptjs.hash(password, 10) });
    return this.userRep.save(newUser);
  }

  findAll() {
    return this.userRep.find();
  }

  async findOne(id: number) {
    const userFound = await this.userRep.findOne({ where: { id } });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.userRep.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);
    return this.userRep.save(updateUser);
  }

  async remove(id: number) {
    const result = await this.userRep.delete({ id });
    if (result.affected == 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRep.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Aquí puedes devolver el usuario, generar un token JWT, o lo que sea adecuado para tu aplicación
    return user; // Por ejemplo, devolver el usuario sin la contraseña
  }
}
