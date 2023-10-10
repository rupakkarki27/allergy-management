import { AllergySeverity } from '@allergy-management/models';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateAllergyDto {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ isArray: true, type: String })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  symptoms?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(AllergySeverity)
  severity?: AllergySeverity;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  isHighRisk?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  notes?: string;
}
