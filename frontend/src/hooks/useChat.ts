import { useState } from "react";

import chatService from "../services/chatService";

import type {
  ChatMessage,
} from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (
    question: string,
    documentId: number,
    conversationId?: number | null
  ) => {
    if (!question.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response =
        await chatService.ask(
            question,
            documentId,
            conversationId
        );

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = (
    conversationMessages: ChatMessage[]
  ) => {
    setMessages(conversationMessages);
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return {
    messages,
    loading,
    sendMessage,
    loadConversation,
    clearConversation,
  };
}