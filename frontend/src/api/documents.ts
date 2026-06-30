import api from "./axios";
import type { Document } from "../types/document";

export async function uploadDocument(
  file: File
): Promise<Document> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<Document>(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getDocuments(): Promise<Document[]> {
  const response = await api.get<Document[]>("/documents");
  return response.data;
}

export async function deleteDocument(id: number) {
  await api.delete(`/documents/${id}`);
}