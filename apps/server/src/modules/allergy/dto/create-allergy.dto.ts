import { AllergySeverity } from '@allergy-management/models';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAllergyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({ isArray: true, type: String })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value.split(',');
  })
  symptoms: string[];

  @ApiProperty()
  @IsEnum(AllergySeverity)
  @IsNotEmpty()
  severity: AllergySeverity;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  @ApiPropertyOptional()
  notes?: string;
}
