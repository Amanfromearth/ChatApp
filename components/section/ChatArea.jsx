"use client"
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { format } from 'date-fns';
import Avatar from "boring-avatars";
import Image from "next/image";
import InputEmoji from 'react-input-emoji'
import { motion } from "framer-motion";

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
      <ArrowLeft className="lg:hidden cursor-pointer" onClick={toggleSidebar} />
      <Avatar name={currentSession?.name || "No Session"}  colors={["#0A0310", "#49007E", "#FF005B", "#FF7D10", "#FFB238"]} size={50} variant="beam" />
      <UserStatus name={currentSession?.name || "No Session"} status="online" />
    </div>
  </header>
);

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form className="flex items-center gap-1 w-full" onSubmit={handleSubmit}>
      <div className="w-full h-full flex items-center bg-front rounded-2xl">
        <InputEmoji
          placeholder="Write Messages..."
          value={message}
          onChange={setMessage}
          cleanOnEnter
          onEnter={sendMessage}
          className=""
        />
      </div>
      <button type="submit" className="p-4 group bg-accenttwo rounded-xl text-white">
        <Image src="/images/paperPlane.svg" className="group-hover:translate-x-1 transition-all ease-in-out duration-300" alt="send icon" width={25} height={25} />
      </button>
    </form>
  );
};



const ChatBubble = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.2 }}
      className={`max-w-[70%] overflow-clip lg:text-base text-sm font-medium p-3 rounded-2xl ${
        isUser ? "bg-accenttwo rounded-br-none text-white" : "bg-[#e6e6e6] rounded-bl-none text-black"
      }`}
    >
      <p>{message.content}</p>
    </motion.div>
  </motion.div>
);

const ChatArea = ({ toggleSidebar, isVisible, currentSession, updateSession, pageLoaded, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentSession) {
      setMessages(currentSession.messages || []);
    }
  }, [currentSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('messageReceived', (data) => {
      if (currentSession) {
        const newMessage = {
          content: data.content,
          timestamp: format(new Date(), 'HH:mm'),
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
        timestamp: format(new Date(), 'HH:mm'),
        isUser: true,
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      updateSession(currentSession.id, newMessage);
      socket.emit("sendMessage", { content: content });
    }
  };

  return (
    <section className={`h-full w-full rounded-2xl ${isVisible ? 'hidden lg:flex' : 'flex'} gap-2 flex-col transition-all duration-500 ease-in-out ${
      pageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <Header toggleSidebar={toggleSidebar} currentSession={currentSession} />
      <main className="rounded-2xl bg-front w-full h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border-2 border-slate-500 bg-front text-slate-500 sticky top-0 left-1/2 transform -translate-x-1/2 rounded-full p-3 text-xs font-medium py-1 mb-4 inline-block">
            {format(new Date(), 'dd/MM/yyyy')}
          </div>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message} isUser={message.isUser} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <MessageInput onSendMessage={handleSendMessage} />
    </section>
  );
};

export default ChatArea;