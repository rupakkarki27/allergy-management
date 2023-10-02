import { Module } from '@nestjs/common';
import { AllergyService } from './allergy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';
import { AllergyController } from './allergy.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Allergy]), CloudinaryModule],
  providers: [AllergyService],
  controllers: [AllergyController],
})
export class AllergyModule {}
