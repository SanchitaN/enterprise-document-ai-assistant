import api from "./axios";

export function getDocumentDownloadUrl(
  documentId: number
) {
  return `${api.defaults.baseURL}/documents/${documentId}/download`;
}