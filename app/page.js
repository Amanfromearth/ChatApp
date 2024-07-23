// app/page.js
"use client";
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import Navigation from "../components/section/Navigation";
import Sidebar from "../components/section/Sidebar";
import ChatArea from "../components/section/ChatArea";

const socket = io('https://chat-backend-c9f1.onrender.com', {
  transports: ['websocket'], 
});

export default function Home() {
  const [userName, setUserName] = useState(' ');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    // Load sessions from local storage for the current user
    const storedSessions = JSON.parse(localStorage.getItem(`chatSessions_${userName}`)) || [];
    setSessions(storedSessions);
  }, [userName]);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const names = [
    "Zoro",
    "Sakura",
    "Goku",
    "Ace",
    "Naruto",
    "Light Yagami",
    "Mikasa Ackerman",
    "Luffy",
    "Tony Stark",
    "Aragorn",
    "James Bond", 
  ];

  const createNewSession = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];

    const newSession = {
      id: Date.now().toString(),
      name: randomName,
      messages: [],
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    setCurrentSession(newSession);
    localStorage.setItem(`chatSessions_${userName}`, JSON.stringify(updatedSessions));
  };

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

  const updateSession = (sessionId, message) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === sessionId) {
        return { ...session, messages: [...session.messages, message] };
      }
      return session;
    });
    setSessions(updatedSessions);
    localStorage.setItem(`chatSessions_${userName}`, JSON.stringify(updatedSessions));
  };

  return (
    <div className="w-full h-full rounded-2xl flex md:p-3 md:gap-2">
      <div
        className={`w-fit ${
          isSidebarVisible ? "flex" : "hidden"
        } h-full md:flex flex-col-reverse gap-2 md:gap-3 md:flex-row`}
      >
        <Navigation />
        <Sidebar
          toggleSidebar={toggleSidebar}
          sessions={sessions}
          createNewSession={createNewSession}
          setCurrentSession={setCurrentSession}
        />
      </div>
      <ChatArea
        isVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        currentSession={currentSession}
        updateSession={updateSession}
        socket={socket}
      />
    </div>
  );
}
