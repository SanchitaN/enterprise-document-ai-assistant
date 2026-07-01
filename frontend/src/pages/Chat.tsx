import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import ChatMessage from "../components/chat/ChatMessage";
import ConversationSidebar from "../components/history/ConversationSidebar";

import { useChat } from "../hooks/useChat";

import { getDocuments } from "../api/documents";
import type { Document } from "../types/document";
import chatService from "../services/chatService";

export default function Chat() {
  const [question, setQuestion] = useState("");

  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] =
    useState<number | null>(null);

  const [selectedConversation, setSelectedConversation] =
    useState<number | null>(null);

  
  const {
  messages,
  loading,
  sendMessage,
  loadConversation,
  clearConversation,
} = useChat();

  useEffect(() => {
    async function loadDocuments() {
      try {
        const docs = await getDocuments();

        setDocuments(docs);

        if (docs.length > 0) {
          setSelectedDocumentId(docs[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadDocuments();
  }, []);

  const handleSubmit = async () => {
  if (!question.trim()) return;

  if (!selectedDocumentId) {
    alert("Please select a document first.");
    return;
  }

  const currentQuestion = question;

  setQuestion("");

await sendMessage(
    currentQuestion,
    selectedDocumentId
);
};
  return (
    <DashboardLayout>

      <div className="flex h-[calc(100vh-140px)] gap-6">

        {/* ================= Sidebar ================= */}

        <ConversationSidebar
  selectedConversation={selectedConversation}
  onSelect={async (id) => {
  setSelectedConversation(id);

  try {
    const history =
      await chatService.getConversationMessages(id);

    loadConversation(
      history.map((message: any) => ({
        id: message.id.toString(),
        role: message.role,
        content: message.content,
        sources: message.sources ?? [],
      }))
    );
  } catch (err) {
    console.error(err);
  }
}}
  onNewChat={() => {
  clearConversation();
  setSelectedConversation(null);
  setQuestion("");
}}
/>

        {/* ================= Chat ================= */}

        <div className="flex flex-1 flex-col rounded-2xl border bg-white shadow-sm">

          {/* Header */}

          <div className="border-b p-6">

            <h1 className="text-2xl font-bold">
              Enterprise AI Assistant
            </h1>

            <p className="mt-2 text-gray-500">
              Ask questions about your uploaded documents.
            </p>

          </div>

          {/* Document Selector */}

          <div className="border-b p-6">

            <label className="mb-2 block text-sm font-semibold">
              Select Document
            </label>

            <select
              value={selectedDocumentId ?? ""}
              onChange={(e) =>
                setSelectedDocumentId(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border p-3"
            >
              {documents.length === 0 ? (
                <option value="">
                  No documents uploaded
                </option>
              ) : (
                documents.map((doc) => (
                  <option
                    key={doc.id}
                    value={doc.id}
                  >
                    {doc.filename}
                  </option>
                ))
              )}
            </select>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-6">

            {messages.length === 0 && (

              <div className="rounded-xl bg-gray-100 p-5 text-gray-600">

                👋 Upload a document and ask your first question.

              </div>

            )}

            {messages.map((message) => (

              <ChatMessage
                key={message.id}
                message={message}
              />

            ))}

            {loading && (

              <div className="mt-4 text-gray-500">

                🤖 AI is thinking...

              </div>

            )}

          </div>

          {/* Input */}

          <div className="border-t p-6">

            <div className="flex gap-4">

              <input
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                placeholder="Ask anything about your document..."
                className="flex-1 rounded-xl border px-4 py-3 outline-none transition focus:border-indigo-500"
              />

              <button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !selectedDocumentId
                }
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}