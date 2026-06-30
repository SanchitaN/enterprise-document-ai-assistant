import type { Document } from "../../types/document";

interface Props {
  document: Document;
}

export default function DocumentCard({ document }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold">{document.filename}</h3>

      <p className="mt-2 text-sm text-gray-500">
        {document.file_type.toUpperCase()}
      </p>

      <p className="mt-2 text-sm">
        Status:
        <span className="ml-2 font-medium text-indigo-600">
          {document.status}
        </span>
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Chunks: {document.chunk_count}
      </p>
    </div>
  );
}