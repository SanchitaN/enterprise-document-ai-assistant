import api from "./axios";

export async function getConversations() {
  const response = await api.get("/conversations");
  return response.data;
}

export async function getConversationMessages(
  conversationId: number
) {
  const response = await api.get(
    `/conversations/${conversationId}/messages`
  );

  return response.data;
}

export async function deleteConversation(
  conversationId: number
) {
  await api.delete(`/conversations/${conversationId}`);
}