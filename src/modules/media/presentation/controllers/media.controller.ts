import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MediaService } from '../../application/services/media.service';
import { IMedia } from '../../domain/models/media.port';
import { CreateMediaDto } from '../../application/dtos/create-media.dto';
import { UpdateMediaDto } from '../../application/dtos/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.mediaService.findById(id);
  }

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }
}
