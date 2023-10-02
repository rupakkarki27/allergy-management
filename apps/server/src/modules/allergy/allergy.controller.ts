import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
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

  // Overriding the create method because we need it to have a custom Dto
  // and generics cannot be used to generate OpenAPI docs
  @ApiOperation({ description: 'Creates an allergy' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAllergyDto })
  @UseInterceptors(FileInterceptor('file'))
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
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() partialEntity: UpdateAllergyDto,
  ) {
    return this.allergyService.update(id, partialEntity);
  }
}
