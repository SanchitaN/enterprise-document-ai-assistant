from ollama import chat


class LLMService:

    def generate_answer(
        self,
        question: str,
        context: list[str],
    ):

        context_text = "\n\n".join(context)

        prompt = f"""
You are an Enterprise Document AI Assistant.

Answer ONLY using the provided context.

Rules:
1. Do NOT use outside knowledge.
2. If the answer is not completely present in the context, clearly say so.
3. If the context contains a list, return the COMPLETE list.
4. Do not omit items.
5. Cite only information present in the context.
6. Keep answers concise and well-structured.
If the answer is based on multiple chunks, combine the information into one complete answer instead of answering from only one chunk.
Context:
{context_text}

Question:
{question}

Answer:
"""

        response = chat(
            model="llama3.2:3b",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response["message"]["content"]