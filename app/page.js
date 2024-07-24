"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import io from "socket.io-client";
import Navigation from "../components/section/Navigation";
import Sidebar from "../components/section/Sidebar";
import ChatArea from "../components/section/ChatArea";

const socket = io("https://ayna-backend-b2aea8062f3c.herokuapp.com", {
  transports: ["websocket"],
});

export default function Home() {
  const [userName, setUserName] = useState("user");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const storedSessions =
      JSON.parse(localStorage.getItem(`chatSessions_${userName}`)) || [];

    if (storedSessions.length === 0) {
      const defaultSession = {
        id: Date.now().toString(),
        name: "Modi Ji",
        messages: [
          {
            content:
              "Anurag is a hardworking developer 🦾. You should consider hiring him. Check out more about him at www.anurag.be",
            timestamp: format(new Date(), "HH:mm"),
            isUser: false,
          },
          {
            content: "Sure, I will consider him 👍",
            timestamp: format(new Date(Date.now() + 60000), "HH:mm"),
            isUser: true,
          },
        ],
      };

      setSessions([defaultSession]);
      setCurrentSession(defaultSession);
      localStorage.setItem(
        `chatSessions_${userName}`,
        JSON.stringify([defaultSession])
      );
    } else {
      setSessions(storedSessions);
      setCurrentSession(storedSessions[0]);
    }
  }, [userName]);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const names = [
    "Zoro",
    "Sakura",
    "Goku",
    "Ace",
    "Naruto",
    "Light Yagami",
    "Susan B",
    "Luffy",
    "Tony Stark",
    "Aragorn",
    "James Bond",
  ];

  const createNewSession = () => {
    const availableNames = names.filter(
      (name) => !sessions.some((session) => session.name === name)
    );

    if (availableNames.length === 0) {
      console.error("All names are taken");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const randomName = availableNames[randomIndex];

    const newSession = {
      id: Date.now().toString(),
      name: randomName,
      messages: [],
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    setCurrentSession(newSession);
    localStorage.setItem(
      `chatSessions_${userName}`,
      JSON.stringify(updatedSessions)
    );
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getuser");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserName(userData.username || " ");
      } catch (error) {
        console.error("Error fetching user data:", error);
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
    localStorage.setItem(
      `chatSessions_${userName}`,
      JSON.stringify(updatedSessions)
    );
  };

  return (
    <div className="w-full h-full rounded-2xl flex lg:p-3 lg:gap-2">
      <div
        className={`w-fit ${
          isSidebarVisible ? "flex" : "hidden"
        } h-full lg:flex flex-col-reverse gap-2 lg:gap-3 lg:flex-row`}
      >
        <Navigation />
        <Sidebar
          toggleSidebar={toggleSidebar}
          sessions={sessions}
          createNewSession={createNewSession}
          setCurrentSession={setCurrentSession}
          currentSession={currentSession} 
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
