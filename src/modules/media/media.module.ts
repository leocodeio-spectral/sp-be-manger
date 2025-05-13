import { Module } from '@nestjs/common';
import { MediaService } from './application/services/media.service';
import { MediaController } from './presentation/controllers/media.controller';
@Module({
  imports: [],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
