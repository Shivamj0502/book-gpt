import React, { useState, useEffect } from "react";
import Loader from "./loader";

type Message = {
  id: string;
  query: string;
  response: string;
};

type MessageInterfaceProps = {
  chatID: string;
};

const MessageInterface: React.FC<MessageInterfaceProps> = (props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/getMessages?chatID=" + props.chatID)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data[0].data);
        let chat = document.getElementById("chat");
        if (chat !== null) {
          chat.scrollTop = chat.scrollHeight;
        }
        setLoading(false);
      });
  }, [isLoading]);

  async function getGPTresponse(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(
      "/api/openai?prompt=" + inputPrompt + "&chatID=" + props.chatID,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );
    if (response.status === 200) {
      setLoading(false);
      setMessages([]);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div id="chat" className="bg-gray-100 flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {messages.map((message) => (
            <div key={message.id} className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                <h3 className="font-bold mr-4">You:</h3>
                <p>{message.query}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <h3 className="font-bold mr-4">Book GPT:</h3>
                <p className="whitespace-pre-line">{message.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={getGPTresponse} className="bg-gray-200 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <input
            className="border border-gray-400 w-full rounded-md py-2 px-4 mr-4"
            type="text"
            name="prompt"
            id="promptInput"
            placeholder="Ask a question..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInterface;
