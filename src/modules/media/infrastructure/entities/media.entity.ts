import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MediaType } from '../../domain/enums/media-type.enum';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'account_id', type: 'uuid' })
  accountId: string;

  @Column()
  type: MediaType;

  @Column({ type: 'varchar', nullable: true })
  url: string | null;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
