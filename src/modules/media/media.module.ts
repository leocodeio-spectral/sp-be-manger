import { Module } from '@nestjs/common';
import { MediaService } from './application/services/media.service';
import { MediaController } from './presentation/controllers/media.controller';
import { IMediaPort } from './domain/ports/media.port';
import { MediaRepositoryAdapter } from './infrastructure/adapters/media.repository';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: IMediaPort,
      useClass: MediaRepositoryAdapter,
    },
  ],
})
export class MediaModule {}
