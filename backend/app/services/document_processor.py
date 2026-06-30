from pathlib import Path
import fitz  # PyMuPDF


class DocumentProcessor:

    def process_document(
        self,
        file_path: Path,
    ):
        extension = file_path.suffix.lower()

        if extension == ".pdf":
            return self.process_pdf(file_path)

        elif extension == ".docx":
            return self.process_docx(file_path)

        elif extension == ".pptx":
            return self.process_pptx(file_path)

        elif extension in [".png", ".jpg", ".jpeg"]:
            return self.process_image(file_path)

        else:
            raise ValueError("Unsupported file type")

    def process_pdf(self, file_path: Path):
        document = fitz.open(file_path)

        text = ""

        for page in document:
            text += page.get_text()

        document.close()

        return text

    def process_docx(self, file_path: Path):
        pass

    def process_pptx(self, file_path: Path):
        pass

    def process_image(self, file_path: Path):
        pass