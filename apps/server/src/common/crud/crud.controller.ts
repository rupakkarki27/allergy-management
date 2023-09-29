import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CrudService } from './crud.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class CrudController<T> {
  protected constructor(private crudService: CrudService<T>) {}

  /**
   * Endpoint to get all the records by pagination
   * GET /{resource}
   * @param page the page number for pagination
   * @param limit total limit in one page
   * @returns
   */
  @ApiOperation({
    description: 'Finds all entities with paginations, has no search options',
  })
  @ApiQuery({ name: 'page', type: 'number', required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: 'number', required: false, example: 10 })
  @Get()
  public async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.crudService.findAll({ page: page || 1, limit: limit || 10 });
  }

  /**
   * Endpoint to find a record
   * @param id the id of the resource to get
   * GET /{resource}/:id
   * @returns
   */
  @ApiOperation({
    description: 'Finds a single entity by id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.crudService.findOneByIdString(id);
  }

  /**
   * Endpoint to create a resource
   * POST /{resource}
   * @param entity the entity to create
   * @returns
   */
  @ApiOperation({
    description: 'Creates a new record',
  })
  @Post()
  public async create(@Body() entity: DeepPartial<T>) {
    return this.crudService.create(entity);
  }

  /**
   * Endpoint to partially update a resource
   * PUT /{resource}/:id
   * @param id the id of the resource to update
   * @param entity the partial entity to update
   * @returns
   */
  @ApiOperation({
    description: 'Updates a record',
  })
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() entity: QueryDeepPartialEntity<T>,
  ) {
    return this.crudService.update(id, entity);
  }

  /**
   * Endpoint to delete a resource
   * DELETE /{resource}/:id
   * @param id the resource id to delete
   * @returns
   */
  @ApiOperation({
    description: 'Updates a record',
  })
  @Delete('id')
  public async delete(@Param('id') id: string) {
    return this.crudService.delete(id);
  }
}
