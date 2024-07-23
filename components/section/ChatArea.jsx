// components/section/ChatArea.js
"use client"
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Avatar from "boring-avatars";
import Image from "next/image";
const UserStatus = ({ name, status }) => (
  <div className="flex flex-col h-full text-left justify-center items-center font-medium text-base">
    <p>{name}</p>
    <p className={`w-full text-left text-sm ${status === "online" ? "text-green-600" : ""}`}>
      {status}
    </p>
  </div>
);

const Header = ({ toggleSidebar, currentSession }) => (
  <header className="rounded-2xl max-h-[80px] sticky top-0 bg-front w-full flex items-center justify-between p-4">
    <div className="w-fit h-full items-center gap-2 flex">
      <ArrowLeft className="md:hidden cursor-pointer" onClick={toggleSidebar} />
      <Avatar name={currentSession?.name || "No Session"}  colors={["#0A0310", "#49007E", "#FF005B", "#FF7D10", "#FFB238"]} size={50} variant="beam" />
      <UserStatus name={currentSession?.name || "No Session"} status="online" />
    </div>
  </header>
);

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="flex items-center gap-1 w-full" onSubmit={handleSubmit}>
      <div className="w-full h-full flex items-center bg-front rounded-2xl">
        <input
          placeholder="Write Messages..."
          className="bg-transparent h-full pl-5 w-full rounded-2xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit" className="p-4 group bg-accenttwo rounded-xl text-white">
        <Image src="/paperPlane.svg" className="group-hover:translate-x-1 transition-all ease-in-out duration-300" alt="send icon" width={25} height={25} />
      </button>
    </form>
  );
};


const ChatBubble = ({ message, isUser }) => (
  <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
    <div className={`max-w-[70%] text-sm font-medium p-3 rounded-2xl ${
      isUser ? "bg-accenttwo rounded-br-none text-white" : "bg-[#e6e6e6] rounded-bl-none text-black"
    }`}>
      <p>{message.content}</p>
    </div>
  </div>
);

const ChatArea = ({ toggleSidebar, isVisible, currentSession, updateSession, socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentSession) {
      setMessages(currentSession.messages || []);
    }
  }, [currentSession]);

  useEffect(() => {
    socket.on('messageReceived', (data) => {
      if (currentSession) {
        const newMessage = {
          content: data.content,
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', }),
          isUser: false,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        updateSession(currentSession.id, newMessage);
      }
    });

    return () => {
      socket.off('messageReceived');
    };
  }, [socket, currentSession, updateSession]);

  const handleSendMessage = (content) => {
    if (currentSession) {
      const newMessage = {
        content,
        timestamp: new Date().toISOString(),
        isUser: true,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      updateSession(currentSession.id, newMessage);
      socket.emit("sendMessage", { content: content });
    }
  };

  return (
    <section className={`h-full w-full rounded-2xl ${isVisible ? 'hidden md:flex' : 'flex'} gap-2 flex-col`}>
      <Header toggleSidebar={toggleSidebar} currentSession={currentSession} />
      <main className="rounded-2xl bg-front w-full h-full flex flex-col items-center justify-end overflow-y-scroll relative p-4">
        <div className="border-2 border-slate-500 bg-front text-slate-500 absolute top-5 rounded-full p-3 text-sm font-medium py-1">
          {new Date().toLocaleDateString()}
        </div>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} isUser={message.isUser} />
        ))}
      </main>
      <MessageInput onSendMessage={handleSendMessage} />
    </section>
  );
};

export default ChatArea;