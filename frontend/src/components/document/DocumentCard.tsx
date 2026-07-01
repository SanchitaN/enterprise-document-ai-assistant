import type { Document } from "../../types/document";

interface Props {
  document: Document;
  onDelete?: (id: number) => void;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case "processed":
      return "bg-green-100 text-green-700";

    case "processing":
      return "bg-yellow-100 text-yellow-700";

    case "failed":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function DocumentCard({
  document,
  onDelete,
}: Props) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
            📄
          </div>

          <div>

            <h3 className="max-w-[180px] truncate text-lg font-semibold text-gray-900">

              {document.filename}

            </h3>

            <p className="text-sm text-gray-500">

              {formatFileSize(document.file_size)}

            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(
            document.status
          )}`}
        >
          {document.status}
        </span>

      </div>

      {/* Divider */}

      <div className="my-6 border-t"></div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-5">

        <div>

          <p className="text-xs uppercase text-gray-400">

            Chunks

          </p>

          <p className="mt-1 text-lg font-semibold">

            {document.chunk_count}

          </p>

        </div>

        <div>

          <p className="text-xs uppercase text-gray-400">

            Type

          </p>

          <p className="mt-1 text-lg font-semibold">

            {document.file_type.toUpperCase()}

          </p>

        </div>

        <div>

          <p className="text-xs uppercase text-gray-400">

            Document ID

          </p>

          <p className="mt-1 text-lg font-semibold">

            #{document.id}

          </p>

        </div>

        <div>

          <p className="text-xs uppercase text-gray-400">

            AI Status

          </p>

          <p className="mt-1 font-semibold text-indigo-600">

            Ready

          </p>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-6 flex gap-3">

        <button
          className="flex-1 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
        >
          💬 Chat
        </button>

        {onDelete && (

          <button
            onClick={() => {
              if (
                window.confirm(
                  `Delete "${document.filename}"?`
                )
              ) {
                onDelete(document.id);
              }
            }}
            className="rounded-xl border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
          >
            🗑
          </button>

        )}

      </div>

    </div>
  );
}