import type { ChatMessage as Message } from "../../types/chat";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`mb-6 flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-gray-100"
        }`}
      >
        <p>{message.content}</p>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (

            <div className="mt-4 border-t pt-3">

              <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
                Sources
              </p>

              {message.sources.map(
                (source, index) => (

                  <div
                    key={index}
                    className="text-sm text-gray-600"
                  >
                    📄 {source.filename}

                    {" • "}

                    Page {source.page}
                  </div>

                )
              )}

            </div>

          )}

      </div>
    </div>
  );
}