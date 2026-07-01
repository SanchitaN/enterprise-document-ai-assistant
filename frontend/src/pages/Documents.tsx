import DashboardLayout from "../components/layout/DashboardLayout";
import UploadDropzone from "../components/document/UploadDropzone";
import DocumentGrid from "../components/document/DocumentGrid";

import { useDocuments } from "../hooks/useDocuments";

export default function Documents() {
  const {
    documents,
    loading,
    uploading,
    uploadDocument,
    deleteDocument,
    error,
  } = useDocuments();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Documents
          </h1>

          <p className="mt-2 text-gray-500">
            Upload and manage your AI knowledge base.
          </p>
        </div>

        <UploadDropzone
          uploading={uploading}
          onUpload={uploadDocument}
        />

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p>Loading documents...</p>
        ) : (
          <DocumentGrid
            documents={documents}
            onDelete={deleteDocument}
          />
        )}
      </div>
    </DashboardLayout>
  );
}