import { useCallback, useEffect, useState } from "react";

import documentService from "../services/documentService";
import type { Document } from "../types/document";
import toast from "react-hot-toast";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await documentService.getAll();
      setDocuments(data);
    } catch {
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadDocument = async (file: File) => {
    try {
      setUploading(true);

      await documentService.upload(file);

      await loadDocuments();
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (id: number) => {
    try {
      await documentService.delete(id);

      await loadDocuments();
    } catch {
      setError("Delete failed.");
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return {
    documents,
    loading,
    uploading,
    error,
    uploadDocument,
    deleteDocument,
    refresh: loadDocuments,
  };
}

toast.success("Document uploaded successfully!");
toast.success("Document deleted.");
toast.error("Unable to generate answer.");