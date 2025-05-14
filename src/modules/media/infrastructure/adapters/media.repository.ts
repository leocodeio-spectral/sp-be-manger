import { Injectable } from '@nestjs/common';
import { IMediaPort } from '../../domain/ports/media.port';
import { IMedia } from '../../domain/models/media.port';
import { DataSource } from 'typeorm';
import { Media } from '../entities/media.entity';

@Injectable()
export class MediaRepositoryAdapter implements IMediaPort {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<IMedia[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const result = await manager.find(Media);
      await queryRunner.commitTransaction();
      return result.map((media) => this.toDomain(media));
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: string): Promise<IMedia | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const result = await manager.findOne(Media, {
        where: { id },
      });
      await queryRunner.commitTransaction();
      return result ? this.toDomain(result) : null;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async save(media: Partial<IMedia>): Promise<IMedia> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      const result = await manager.save(Media, media);
      await queryRunner.commitTransaction();
      return this.toDomain(result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, media: Partial<IMedia>): Promise<IMedia | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      await manager.update(Media, id, media);
      await queryRunner.commitTransaction();
      const updatedResult = await manager.findOne(Media, {
        where: { id },
      });
      return updatedResult ? this.toDomain(updatedResult) : null;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;
      await manager.delete(Media, id);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  toDomain(media: Media): IMedia {
    return {
      id: media.id,
      userId: media.userId,
      accountId: media.accountId,
      type: media.type,
      url: media.url ? media.url : null,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt,
    };
  }

  toEntity(media: IMedia): Media {
    return {
      id: media.id,
      userId: media.userId,
      accountId: media.accountId,
      type: media.type,
      url: media.url ? media.url : null,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt,
    };
  }
}
