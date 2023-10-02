import { UserRole } from '@allergy-management/models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'rupakkarki123@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password length must be greater than 8, and should contain UPPERCASE and symbol',
    },
  )
  password: string;

  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
