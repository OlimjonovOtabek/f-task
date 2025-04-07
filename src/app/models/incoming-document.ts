import { Correspondent, DeliveryMethod } from '../enums';

export interface IncomingDocument {
  regNumber: string;
  regDate: Date;
  outgoingNumber?: string;
  outgoingDate?: Date;
  deliveryMethod: DeliveryMethod;
  correspondent: Correspondent;
  topic: string;
  description?: string;
  executionDate?: Date;
  access: boolean;
  control: boolean;
  file?: File | null;
  filePath?: string;
}
