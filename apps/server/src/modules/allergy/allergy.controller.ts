import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CrudController } from '../../common/crud/crud.controller';
import { Allergy } from './allergy.entity';
import { AllergyService } from './allergy.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { UserRole } from '@allergy-management/models';
import { HasRoles } from '../auth/decorators/has-roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('allergies')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('allergies')
export class AllergyController extends CrudController<Allergy> {
  constructor(
    private allergyService: AllergyService,
    private cloudinaryService: CloudinaryService,
  ) {
    super(allergyService);
  }

  /**
   * Endpoint to get all the allergies by pagination - overriding it to add custom search options
   * GET /{resource}
   * @param page the page number for pagination
   * @param limit total limit in one page
   * @returns
   */
  @ApiOperation({
    description: 'Finds all allergies with pagination',
  })
  @ApiQuery({ name: 'page', type: 'number', required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: 'number', required: false, example: 10 })
  @Get()
  public async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.allergyService.findAll(
      { page: page || 1, limit: limit || 10 },
      // always show high risk allergies at the top with alphabetical ordering
      {
        order: {
          isHighRisk: { direction: 'DESC' },
          name: { direction: 'ASC' },
        },
      },
    );
  }

  // Overriding the create method because we need it to have a custom Dto
  // and generics cannot be used to generate OpenAPI docs
  @ApiOperation({ description: 'Creates an allergy' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAllergyDto })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Post('/')
  async create(
    @Body() body: CreateAllergyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // upload the image file
    if (file) {
      const uploadResponse = await this.cloudinaryService.uploadImage(file);

      if (uploadResponse?.url) {
        const allergy = await this.allergyService.create({
          ...body,
          image: uploadResponse.url,
        });

        return allergy;
      } else {
        throw new InternalServerErrorException();
      }
    } else {
      throw new BadRequestException('File is missing');
    }
  }

  @ApiOperation({ description: 'Creates an allergy' })
  @ApiBody({ type: UpdateAllergyDto })
  @UseGuards(RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() partialEntity: UpdateAllergyDto,
  ) {
    return this.allergyService.update(id, partialEntity);
  }
}
