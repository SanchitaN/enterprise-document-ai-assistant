import { askQuestion } from "../api/chat";

import {
  getConversationMessages,
  getConversations,
  deleteConversation,
} from "../api/conversations";

class ChatService {
  async ask(
    question: string,
    documentId: number,
    conversationId?: number | null
  ) {
    return askQuestion(
      question,
      documentId,
      conversationId
    );
  }

  async getConversations() {
    return getConversations();
  }

  async getConversationMessages(
    conversationId: number
  ) {
    return getConversationMessages(
      conversationId
    );
  }

  async deleteConversation(
    conversationId: number
  ) {
    return deleteConversation(
      conversationId
    );
  }
}

export default new ChatService();