import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/crud/crud.service';
import { Allergy } from './allergy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  IPaginationMeta,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AllergyService extends CrudService<Allergy> {
  constructor(
    @InjectRepository(Allergy)
    private allergyRepository: Repository<Allergy>,
  ) {
    super(allergyRepository);
  }

  public findAll(
    paginationOptions: IPaginationOptions<IPaginationMeta>,
  ): Promise<Pagination<Allergy, IPaginationMeta>> {
    // creating a query builder to query for all allergies
    const queryBuilder = this.allergyRepository.createQueryBuilder('allergy');

    queryBuilder.orderBy('allergy.isHighRisk', 'DESC');
    // because PostgreSQL is case sensitive, and will order all uppercase first
    // sorting by converting to lowercase.
    // this is also one of the reasons to use the query builder: to use the LOWER function
    queryBuilder.addOrderBy('LOWER(allergy.name)', 'ASC');

    return paginate<Allergy>(queryBuilder, {
      limit: paginationOptions.limit,
      page: paginationOptions.page,
    });
  }
}
