import { AllergySeverity } from '@allergy-management/models';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class UpdateAllergyDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional({ isArray: true, type: String })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  symptoms?: string[];

  @ApiPropertyOptional()
  @IsEnum(AllergySeverity)
  severity?: AllergySeverity;

  @ApiPropertyOptional({ type: Boolean })
  isHighRisk?: boolean;

  @ApiPropertyOptional()
  notes?: string;
}
