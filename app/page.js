"use client"
import Image from "next/image";
import Avatar from "boring-avatars";
import { ArrowLeft, PlusIcon, UserRound } from "lucide-react";
import { useState } from "react";

const Navigation = () => (
  <nav className={`md:h-full bg-black w-full md:w-fit justify-between md:rounded-2xl hidden md:flex flex-row p-2 md:flex-col md:p-5`}>
    <Image src="/logo.png" alt="logo" className="w-10 h-10" width={60} height={60} />
    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#1a1931] text-white">
      <UserRound className="w-4" />
    </div>
  </nav>
);

const SearchBar = () => (
  <div className="w-fit flex items-center min-w-[220px] border-2 p-1 border-zinc-300 rounded-full">
    <input
      placeholder="Search"
      className="bg-transparent w-full rounded-full px-2"
    />
  </div>
);

const ChatListItem = ({ name, message, time, avatarName,toggleSidebar }) => (
  <li className="w-full">
    <div className="w-full flex items-center justify-between cursor-pointer" onClick={toggleSidebar}>
      <div className="flex items-center gap-2">
        <Avatar name={avatarName} variant="beam" />
        <div className="flex flex-col h-full text-left justify-center items-center font-medium text-base">
          <p className="w-full text-left text-lg font-medium">{name}</p>
          <p className="w-full text-left text-sm text-zinc-400">{message}</p>
        </div>
      </div>
      <p className="text-xs text-zinc-400 font-medium">{time}</p>
    </div>
    <div className="w-full border-t-2 border-slate-200 mt-2" />
  </li>
);

const Sidebar = ({ isVisible, toggleSidebar }) => (
  <aside className={`w-fit ${isVisible ? 'flex' : 'hidden'} h-full md:flex gap-2 flex-col`}>
    <header className="h-fit max-h-[80px] p-6 flex items-center gap-2 rounded-2xl bg-front">
      <h2 className="text-xl font-semibold">Chat</h2>
      <SearchBar />
      <button className="rounded-full p-1 text-white bg-accenttwo">
        <PlusIcon />
      </button>
    </header>
    <div className="h-full p-4 flex flex-col rounded-2xl bg-front">
      <p className="w-full text-left text-sm text-zinc-400 font-medium">All</p>
      <ul className="w-full h-full gap-2 flex flex-col items-center p-2">
        <ChatListItem
        toggleSidebar={toggleSidebar}
          name="Jack"
          message="Hi, how are you"
          time="10:30pm"
          avatarName="Fannie Lou"
        />
        <ChatListItem
        toggleSidebar={toggleSidebar}
          name="Luffy"
          message="Lets go find treasure"
          time="4:56pm"
          avatarName="Mar Bredsadant"
        />
      </ul>
    </div>
  </aside>
);

const UserStatus = ({ name, status }) => (
  <div className="flex flex-col h-full text-left justify-center items-center font-medium text-base">
    <p>{name}</p>
    <p className={`w-full text-left text-sm ${status === "online" ? "text-green-600" : ""}`}>
      {status}
    </p>
  </div>
);

const Header = ({ toggleSidebar }) => (
  <header className="rounded-2xl max-h-[80px] bg-front w-full flex items-center justify-between p-4">
    <div className="w-fit h-full items-center gap-2 flex">
      <ArrowLeft className="md:hidden cursor-pointer" onClick={toggleSidebar} />
      <Avatar name="Alice Paul" size={50} variant="beam" />
      <UserStatus name="Sasuke uchia" status="online" />
    </div>
  </header>
);

const MessageInput = () => (
  <form className="flex items-center gap-1 w-full">
    <div className="w-full h-full flex items-center bg-front rounded-2xl">
      <input
        placeholder="Write Messages..."
        className="bg-transparent h-full pl-5 w-full rounded-2xl"
      />
    </div>
    <button type="submit" className="p-4 bg-accenttwo rounded-xl text-white">
      <Image src="/paperPlane.svg" alt="send icon" width={25} height={25} />
    </button>
  </form>
);

const ChatBubble = ({ message, isUser }) => (
  <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
    <div className={`max-w-[70%] text-sm font-medium p-3 rounded-2xl ${
      isUser ? "bg-accenttwo rounded-br-none text-white" : "bg-[#e6e6e6] rounded-bl-none text-black"
    }`}>
      <p>{message}</p>
    </div>
  </div>
);

const ChatArea = ({ toggleSidebar, isVisible }) => (
  <section className={`h-full w-full rounded-2xl ${isVisible ? 'hidden' : 'flex'} gap-2 flex-col`}>
    <Header toggleSidebar={toggleSidebar} />
    <main className="rounded-2xl bg-front w-full h-full flex flex-col items-center justify-end overflow-y-auto relative p-4">
      <div className="border-2 border-slate-600 bg-front text-slate-500 absolute top-5 rounded-full p-3 text-sm font-medium py-1">
        17 july
      </div>
      <ChatBubble message="Hey, how's it going?" isUser={true} />
      <ChatBubble message="I'm doing great! How about you?" isUser={false} />
      <ChatBubble message="Pretty good, thanks for asking!" isUser={true} />
      <ChatBubble message="Did you finish that project we were working on?" isUser={false} />
      <ChatBubble message="Almost done, just need to add some final touches." isUser={true} />
    </main>
    <MessageInput />
  </section>
);

export default function Home() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div className="w-full h-full rounded-2xl flex md:p-3 md:gap-2">
      <div className="w-fit h-full items-center justify-center flex flex-col gap-3 md:flex-row">
        <Navigation  />
        <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      </div>
      <ChatArea isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
    </div>
  );
}