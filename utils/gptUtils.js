import { addAssistantMessage, getConversation } from "./conversationHistoryUtil";


export const makeImageRequest = async (prompt) => {
  const response = await fetch("http://10.0.2.2:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      messages: [{ role: "user", content: `Describe this image prompt: "${prompt}"` }],
      stream: false,
    }),
  });

  const data = await response.json();

  if (data?.message?.content) {
    const description = data.message.content.trim();
    addAssistantMessage(description);
    // Return an array of message objects for ImageScreen
    return [{ type: "text", content: description }];
  }

  throw new Error("Failed to get image description");
};


export const makeChatRequest = async () => {
  const messages = getConversation();
//http://192.168.1.100:11434/api/chat
  const response = await fetch("http://10.0.2.2:11434/api/chat", { 
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

