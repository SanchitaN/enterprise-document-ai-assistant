export interface Document {
  id: number;
  filename: string;
  file_type: string;
  file_size: number;
  status: string;
  text_length: number;
  chunk_count: number;
  processing_error: string | null;
  upload_time: string;
}

export type UploadResponse = Document;