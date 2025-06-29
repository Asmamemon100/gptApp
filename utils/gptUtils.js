import { addAssistantMessage, getConversation } from "./conversationHistoryUtil";

export const makeChatRequest = async () => {
  const messages = getConversation();
//http://192.168.1.100:11434/api/chat
  const response = await fetch("http://localhost:11434/api/chat", { // Windows Ollama server
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3", // or llama3:8b or whatever you pulled
      messages: messages,
      stream: false
    })
  });

  const data = await response.json();

  if (data && data.message && data.message.content) {
    let responseText = data.message.content.trim().replace(/(\r\n|\n|\r)/gm, "");
    addAssistantMessage(responseText);
    console.log(getConversation());
    return;
  }

  throw new Error("The response is in an unsupported format");
};
