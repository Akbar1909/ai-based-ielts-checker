export class UploadEntity {
  id: number;
  ticketId: number;
  filename: string;
  originalName: string;
  filePath: string;
  size: number;
  mimetype: string;
  createdAt: Date;
  updatedAt: Date;
}
