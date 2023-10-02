import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/crud/crud.service';
import { Allergy } from './allergy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AllergyService extends CrudService<Allergy> {
  constructor(
    @InjectRepository(Allergy)
    private allergyRepository: Repository<Allergy>,
  ) {
    super(allergyRepository);
  }
}
