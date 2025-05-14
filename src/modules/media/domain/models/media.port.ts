import { MediaType } from '../enums/media-type.enum';

export class IMedia {
  id: string;
  userId: string;
  accountId: string;
  type: MediaType;
  url?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
