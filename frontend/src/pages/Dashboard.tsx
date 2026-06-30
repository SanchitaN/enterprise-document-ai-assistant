import DashboardLayout from "../components/layout/DashboardLayout";

import UploadDropzone from "../components/document/UploadDropzone";
import DocumentGrid from "../components/document/DocumentGrid";

import { useDocuments } from "../hooks/useDocuments";

export default function Dashboard() {
  const {
    documents,
    loading,
    uploading,
    uploadDocument,
    error,
  } = useDocuments();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <UploadDropzone
          uploading={uploading}
          onUpload={uploadDocument}
        />

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p>Loading documents...</p>
        ) : (
          <DocumentGrid documents={documents} />
        )}
      </div>
    </DashboardLayout>
  );
}