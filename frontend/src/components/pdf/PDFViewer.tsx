import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  documentId: number;
  currentPage: number;
}

export default function PDFViewer({
  documentId,
  currentPage,
}: Props) {
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    async function loadPDF() {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `http://localhost:8000/documents/${documentId}/download`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load PDF");
        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        setPdfUrl(url);
      } catch (err) {
        console.error(err);
      }
    }

    loadPDF();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [documentId]);

  if (!pdfUrl) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading PDF...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white">

      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">
          PDF Preview
        </h2>
      </div>

      <div className="flex flex-1 justify-center overflow-auto p-4">

        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) =>
            setNumPages(numPages)
          }
        >
          <Page
            pageNumber={currentPage}
            width={600}
          />
        </Document>

      </div>

      <div className="border-t p-3 text-center">

        Page {currentPage} of {numPages}

      </div>

    </div>
  );
}