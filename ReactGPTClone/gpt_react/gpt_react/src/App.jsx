import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress";

// export default App;
function ChatMessage({ message, type }) {
  // Function to remove text after "###"
  const cleanMessage = (message) => {
    const index = message.indexOf("###");
    if (index !== -1) {
      return message.substring(0, index).trim();
    }
    return message;
  };

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
          {cleanMessage(message)
            .split("<0x0A>")
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      )}
    </div>
  );
}

// const newSocket = io("http://localhost:8080");

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newSocket, setNewSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placeHolderMessage, setPlaceHolderMessage] =
    useState("type something...");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    //const newSocket = io("http://localhost:8080");
    //se carga la session con el socket
    const newSocket = io("http://10.199.20.137:8080");
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
      setSpinner(false);
      setPlaceHolderMessage("type something...");
      setLoading(false);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    console.log("Click pressed , esto tiene loading", loading);
    console.log("Esto tiene placeHolderMessage", placeHolderMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "send", message: inputMessage },
      { type: "loading", message: "Loading..." },
    ]);

    setSpinner(true);
    setPlaceHolderMessage("Working on the answer..");
    setInputMessage("");
    setLoading(true);
    //llama nuevamente al socket
    newSocket.emit("message", inputMessage);
  };

  return (
    <>
      <style>{`
        .pointer-events-none {
          pointer-events: none;
        }
        .no-caret {
          caret-color: transparent;
        }
      `}</style>
      <div className="p-5 h-screen bg-black">
        <div className="container mx-auto bg-gray-900 h-full  flex flex-col">
          <div className="flex-grow p-3 flex flex-row items-end ">
            {/* <div className="flex-grow p-3 flex flex-row items-end overflow-y-auto "> */}
            <div className="w-full space-y-3  overflow-y-auto h-[70vh]">
              {/* <div className="w-full space-y-3   h-[70vh]"> */}
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
              disabled={loading}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={placeHolderMessage}
              type="text"
              // className="w-full p-2 bg-transparent text-white border-white border-2 rounded-md outline-none"
              className={`w-full p-2 bg-transparent text-white border-white border-2 rounded-md outline-none ${
                loading ? "pointer-events-none no-caret" : ""
              }`}
            ></input>
            <button
              onClick={sendMessage}
              className="bg-violet-600 px-3 py-2 rounded-md mx-2 text-white cursor-pointer"
              disabled={loading}
            >
              {/* {spinner ? <ImSpinner6 /> : "Send"} */}
              {spinner ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Send"
              )}
              {/* Send */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
