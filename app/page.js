"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import io from "socket.io-client";
import Navigation from "../components/section/Navigation";
import Sidebar from "../components/section/Sidebar";
import ChatArea from "../components/section/ChatArea";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

const socket = io(baseUrl, {
  transports: ["websocket"],
});

export default function Home() {
  const [userName, setUserName] = useState("user");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);
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

  const baseNames = [
    "Zoro",
    "Gandhi",
    "Goku",
    "Ace",
    "Naruto",
    "Light Yagami",
    "Aryabhata",
    "Luffy",
    "Tony Stark",
    "Aragorn",
    "James Bond",
  ];
  
  const createNewSession = () => {
    let newName;
    let counter = 1;
  
    do {
      const availableNames = baseNames.filter(
        (name) => !sessions.some((session) => session.name === name)
      );
  
      if (availableNames.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        newName = availableNames[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * baseNames.length);
        newName = `${baseNames[randomIndex]} ${counter}`;
        counter++;
      }
    } while (sessions.some((session) => session.name === newName));
  
    const newSession = {
      id: Date.now().toString(),
      name: newName,
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
    <div className="w-full h-full rounded-2xl rounded-b-none lg:rounded-b-2xl flex lg:p-3 lg:gap-2 overflow-hidden">
      <div
        className={`w-fit ${
          isSidebarVisible ? "flex" : "hidden"
        } h-full lg:flex flex-col-reverse gap-2 lg:gap-3 lg:flex-row transition-all duration-500 ease-in-out ${
         pageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
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
        pageLoaded={pageLoaded}
      />
    </div>
  );
}
