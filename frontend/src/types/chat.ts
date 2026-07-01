export interface Source {
  filename: string;
  page: number;
  chunk_index: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}