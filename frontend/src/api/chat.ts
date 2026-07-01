import api from "./axios";

export interface ChatRequest {
  question: string;
  document_id: number;
}

export interface ChatSource {
  filename: string;
  page: number;
  chunk_index: number;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
}


  

export async function askQuestion(
  question: string,
  documentId: number,
  conversationId?: number | null
) {
  const response = await api.post("/chat", {
    question,
    document_id: documentId,
    conversation_id: conversationId,
  });

  return response.data;
}