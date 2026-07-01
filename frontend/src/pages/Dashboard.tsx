import DashboardLayout from "../components/layout/DashboardLayout";

import UploadDropzone from "../components/document/UploadDropzone";
import DocumentGrid from "../components/document/DocumentGrid";

import { useDocuments } from "../hooks/useDocuments";
import DocumentGridSkeleton from "../components/ui/DocumentGridSkeleton";

export default function Dashboard() {
  const {
    documents,
    loading,
    uploading,
    uploadDocument,
    error,
  } = useDocuments();

  const totalStorage = (
    documents.reduce(
      (sum, doc) => sum + doc.file_size,
      0
    ) /
    (1024 * 1024)
  ).toFixed(2);

  const processedDocs = documents.filter(
    (doc) => doc.status === "processed"
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your AI documents and monitor processing.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Documents"
            value={documents.length}
            subtitle="Uploaded PDFs"
            icon="📄"
            color="bg-blue-100"
          />

          <StatCard
            title="Processed"
            value={processedDocs}
            subtitle="Ready for AI Chat"
            icon="✅"
            color="bg-green-100"
          />

          <StatCard
            title="Storage"
            value={`${totalStorage} MB`}
            subtitle="Disk Usage"
            icon="💾"
            color="bg-purple-100"
          />

          <StatCard
            title="Pending"
            value={documents.length - processedDocs}
            subtitle="Processing Queue"
            icon="⏳"
            color="bg-orange-100"
          />

        </div>

        {/* Upload */}

        <UploadDropzone
          uploading={uploading}
          onUpload={uploadDocument}
        />

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Documents */}

        {loading ? (
            <DocumentGridSkeleton />
        ) : (
            <DocumentGrid documents={documents} />
        )}

              </div>
            </DashboardLayout>
          );
        }

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {subtitle}
          </p>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}
        >
          <span className="text-2xl">
            {icon}
          </span>
        </div>

      </div>

    </div>
  );
}