// components/section/Sidebar.js
"use client"
import { PlusIcon } from "lucide-react";
import Avatar from "boring-avatars";
import { useEffect, useState } from "react";

const ChatListItem = ({ session, toggleSidebar, setCurrentSession, currentSession }) => {
  return(
  <li className={`hover:bg-[#e9e9e9] px-5 w-full ${currentSession?.id === session.id ? 'bg-[#e9e9e9]' : ''}`}>
    <div
      className="w-full py-1 flex items-center justify-between cursor-pointer"
      onClick={() => {
        setCurrentSession(session);
        toggleSidebar();
      }}
    >
      <div className="flex items-center gap-2">
        <Avatar name={session.name} variant="beam" colors={["#0A0310", "#49007E", "#FF005B", "#FF7D10", "#FFB238"]} />
        <div className="flex flex-col h-full text-left justify-center items-center font-medium text-base">
          <p className="w-full text-left text-lg font-medium">{session.name}</p>
          <div className="w-full">
          <p className="max-w-[180px] truncate text-left text-sm text-zinc-400">
            {session.messages[session.messages.length - 1]?.content || "No messages yet"}
          </p></div>
        </div>

        

      </div>
      <p className="text-xs text-zinc-400 font-medium">
        {session.messages[session.messages.length - 1]?.timestamp || ""}
      </p>
    </div>
    <div className="w-full border-t-2 border-slate-200 mt-2" />
  </li>
)};

const Sidebar = ({ toggleSidebar, sessions, createNewSession, setCurrentSession, currentSession }) => {
  const [userName, setUserName] = useState(' ');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getuser');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserName(userData.username || ' ');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  return(
    <aside className={`transition-all ease-in-out w-screen md:w-fit h-full md:flex gap-2 flex-col`}>
      <header className="h-fit w-full justify-between max-h-[80px] md:min-w-[350px] p-6 flex items-center gap-2 rounded-2xl bg-front">
        <h2 className="text-xl text-nowrap font-semibold">Welcome {userName}</h2>
        <button
          className="rounded-full group p-1 text-white bg-accenttwo"
          onClick={createNewSession}
        >
          <PlusIcon className="group-hover:rotate-180 transition-all ease-in-out duration-300"/>
        </button>
      </header>
      <div className="h-full flex flex-col overflow-x-hidden  overflow-y-scroll rounded-2xl bg-front">
        <p className="w-full text-left text-sm text-zinc-400 m-5 font-medium">All</p>
        <ul className="w-full h-full flex flex-col items-center">
        {sessions.map((session) => (
            <ChatListItem
              key={session.id}
              session={session}
              toggleSidebar={toggleSidebar}
              setCurrentSession={setCurrentSession}
              currentSession={currentSession}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;