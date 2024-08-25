// hooks/useWebSocket.js
"use client";
import {useEffect, useState} from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      setMessages(event.data);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return {messages, sendMessage};
};

export default useWebSocket;
