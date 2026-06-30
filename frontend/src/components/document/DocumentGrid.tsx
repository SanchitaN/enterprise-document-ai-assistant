import type { Document } from "../../types/document";
import DocumentCard from "./DocumentCard";

interface Props {
  documents: Document[];
}

export default function DocumentGrid({
  documents,
}: Props) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
        />
      ))}
    </div>
  );
}