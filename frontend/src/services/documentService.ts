import * as documentApi from "../api/documents";

class DocumentService {
  upload(file: File) {
    return documentApi.uploadDocument(file);
  }

  getAll() {
    return documentApi.getDocuments();
  }

  delete(id: number) {
    return documentApi.deleteDocument(id);
  }
}

export default new DocumentService();