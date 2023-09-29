import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * This class is a generic common CRUD service class
 */
export class CrudService<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  /**
   * Finds entities that match given find options with pagination.
   * Also counts all entities that match given conditions,
   * @param options
   * @returns
   */
  public async findAll(paginationOptions: IPaginationOptions) {
    return paginate<T>(this.repository, paginationOptions);
  }

  /**
   * Finds first entity by a given find options.
   * If entity was not found in the database - returns null.
   *
   * @param id {string}
   * @param options
   * @returns
   */
  public async findOneByIdString(id: string, options?: FindOneOptions<T>) {
    // use the findOne method to filter by the where condition with the id field,
    // if the options contains other search options, include them

    const record = await this.repository.findOne({
      where: { id, ...(options && options.where ? options.where : {}) },
      ...(options && options.select ? { select: options.select } : {}),
      ...(options && options.relations ? { relations: options.relations } : {}),
      ...(options && options.order ? { order: options.order } : {}),
    } as FindOneOptions<T>);

    if (!record) {
      throw new NotFoundException('The requested record was not found');
    }

    return record;
  }

  /**
   * Finds first entity by a given find options.
   * If entity was not found in the database - returns null.
   *
   * @param options
   * @returns
   */
  public async findOneByOptions(options: FindOneOptions<T>): Promise<T | null> {
    const record = await this.repository.findOne(options);
    if (!record) {
      throw new NotFoundException(`The requested record was not found`);
    }
    return record;
  }

  /**
   * Finds first entity that matches given where condition.
   * If entity was not found in the database - returns null.
   *
   * @param options
   * @returns
   */
  public async findOneByWhereOptions(
    options: FindOptionsWhere<T>,
  ): Promise<T | null> {
    const record = await this.repository.findOneBy(options);
    if (!record) {
      throw new NotFoundException(`The requested record was not found`);
    }
    return record;
  }

  /**
   * Creates a new record
   * @param entity
   * @returns
   */
  public async create(entity: DeepPartial<T>): Promise<T> {
    const obj = this.repository.create(entity);
    try {
      return await this.repository.save(obj);
    } catch (err) {
      if (err?.driverError?.code === '23505') {
        throw new ConflictException();
      } else throw new BadRequestException();
    }
  }

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   * @param id
   * @param partialEntity
   * @returns
   */
  public async update(
    id: string | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult | T> {
    try {
      // update the updatedAt column
      const date = new Date();
      return await this.repository.update(id, {
        ...partialEntity,
        updatedAt: date,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Deletes entities by a given criteria.
   * @param criteria
   * @param options
   * @returns
   */
  public async delete(
    criteria: string | number | FindOptionsWhere<T>,
  ): Promise<DeleteResult> {
    try {
      return await this.repository.delete(criteria);
    } catch (error) {
      throw new NotFoundException(`The record was not found`, error);
    }
  }
}
