import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerDto: CreateUserDto) {
    return await this.usersService.create(registerDto);
  }

  async login({ email, password }: LoginUserDto) {
    // Busca el usuario por correo electrónico
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Crea el payload del token JWT
    const payload = { email: user.email };
    // Genera el token JWT
    const token = await this.jwtService.signAsync(payload);
    const roles = await this.usersService.getUserRoles(user.id);

    // Retorna el correo electrónico y el token
    return { user, roles, token };
  }
}
