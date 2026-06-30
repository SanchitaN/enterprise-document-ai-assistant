import { useRef } from "react";

interface Props {
  uploading: boolean;
  onUpload(file: File): void;
}

export default function UploadDropzone({
  uploading,
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          rounded-xl
          border-2
          border-dashed
          p-10
          text-center
          transition
          cursor-pointer
          ${
            uploading
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-indigo-600 hover:bg-indigo-50"
          }
        `}
      >
        <h3 className="text-xl font-semibold">
          Upload Document
        </h3>

        <p className="mt-2 text-gray-500">
          Drag & drop or click to browse
        </p>

        {uploading && (
          <p className="mt-4 text-indigo-600">
            Uploading...
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.docx,.pptx,.png,.jpg,.jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onUpload(file);
          }
        }}
      />
    </>
  );
}