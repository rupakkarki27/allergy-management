import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../user/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignUpDto, required: true })
  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto, required: true })
  @Post('signin')
  async login(@Req() req: any) {
    return this.authService.signIn(req.user as Partial<User>);
  }
}
