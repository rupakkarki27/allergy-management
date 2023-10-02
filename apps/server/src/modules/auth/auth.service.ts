import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<IConfig>,
  ) {}

  async signUp(body: SignUpDto) {
    try {
      // hash the password and create the user
      const hash = await bcrypt.hash(body.password, 10);

      body.password = hash;

      // even though we have used select: false in user entity
      // that will not apply to the save method, so excluding password

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = await this.userService.create(body);

      return rest;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(user: Partial<User>) {
    const token = await this.generateToken(user);

    return token;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getAllUserDetails(email);

    if (!user) throw new NotFoundException();

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Username or password doesnot match');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pw, ...rest } = user;

    return rest;
  }

  async generateToken(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '10m',
    });

    return { accessToken };
  }
}
