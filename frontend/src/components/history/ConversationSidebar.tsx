import { useEffect, useState } from "react";

interface Conversation {
  id: number;
  title: string;
  document_id: number;
  created_at: string;
}

interface Props {
  selectedConversation: number | null;
  onSelect: (id: number) => void;
  onNewChat: () => void;
}

export default function ConversationSidebar({
  selectedConversation,
  onSelect,
  onNewChat,
}: Props) {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const token =
          localStorage.getItem("access_token");

        const response = await fetch(
          "http://localhost:8000/conversations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setConversations(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <div className="w-72 border-r bg-white">

      <div className="border-b p-4">

        <h2 className="mb-4 text-lg font-bold">
            History
        </h2>

        <button
            onClick={onNewChat}
            className="w-full rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-700"
        >
            + New Chat
        </button>

        </div>

      <div className="overflow-y-auto">

        {conversations.map((conversation) => (

          <button
            key={conversation.id}
            onClick={() =>
              onSelect(conversation.id)
            }
            className={`w-full border-b p-4 text-left hover:bg-gray-100 ${
              selectedConversation ===
              conversation.id
                ? "bg-indigo-50"
                : ""
            }`}
          >

            <div className="font-semibold">

              {conversation.title}

            </div>

            <div className="text-xs text-gray-500">

              {new Date(
                conversation.created_at
              ).toLocaleDateString()}

            </div>

          </button>

        ))}

      </div>
    </div>
  );
}