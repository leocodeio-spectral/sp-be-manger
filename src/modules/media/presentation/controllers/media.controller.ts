import { Controller, Get } from '@nestjs/common';
import { MediaService } from '../../application/services/media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async getMedia() {
    return 'Hello World';
  }
}
