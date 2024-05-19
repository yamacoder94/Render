import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// export default App;
function ChatMessage({ message, type }) {
  return (
    <div
      className={`flex w-full ${
        type === "send" ? "justify-start" : "justify-end"
      }`}
    >
      {type === "send" ? (
        <div className="bg-violet-500 p-2 rounded-b-lg rounded-tr-lg text-white">
          {message}
        </div>
      ) : (
        <div className="bg-white p-2 rounded-b-lg rounded-tl-lg text-black">
          {message.split("<0x0A>").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newSocket, setNewSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setNewSocket(newSocket);

    newSocket.on("response", (message) => {
      setMessages((prevMessages) => {
        // Find the last message with the type "loading"
        const updatedMessages = [...prevMessages];
        const lastIndex = updatedMessages.length - 1;
        if (updatedMessages[lastIndex].type === "loading") {
          updatedMessages[lastIndex] = {
            type: "receive",
            message,
          };
        }
        return updatedMessages;
      });
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "send", message: inputMessage },
      { type: "loading", message: "Loading..." },
    ]);

    setInputMessage("");
    newSocket.emit("message", inputMessage);
  };

  return (
    <div className="p-5 h-screen bg-black">
      <div className="container mx-auto bg-gray-900 h-full  flex flex-col">
        <div className="flex-grow p-3 flex flex-row items-end ">
          <div className="w-full space-y-3  overflow-scroll h-[70vh]">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                type={message.type}
                message={message.message}
              />
            ))}
          </div>
        </div>

        <div className="h-[100px] p-3 flex justify-center items-center bg-gray-700">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="type something"
            type="text"
            className="w-full p-2 bg-transparent text-white border-white border-2 rounded-md outline-none"
          ></input>
          <button
            onClick={sendMessage}
            className="bg-violet-600 px-3 py-2 rounded-md mx-2 text-white cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
