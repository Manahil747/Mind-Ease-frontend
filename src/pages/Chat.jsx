import { useState, useRef, useEffect } from "react";
import { FiSend, FiCpu } from "react-icons/fi";
import API from "../api";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hi! I'm Mind Ease AI. I'm here to listen and support you. How are you feeling today?" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputVal.trim()) return;

    const userMessage = inputVal;
    const newMsg = { id: Date.now(), sender: "user", text: userMessage };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const res = await API.post("/chatAI/send", { message: userMessage });
      const aiText = res.data.data.response;
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: aiText }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: "Sorry, I'm having trouble responding right now. Please try again!" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container animate-fade-in">
      <header className="chat-header animate-slide-up">
        <div className="chat-avatar">
          <FiCpu />
        </div>
        <div>
          <h1 className="chat-title">Mind Ease AI</h1>
          <div className="chat-status">
            <span className="status-dot"></span> Online and ready to support
          </div>
        </div>
      </header>

      <div className="chat-box animate-pop-in animate-stagger-1" ref={chatBoxRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper ai">
            <div className="message-bubble typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-area animate-slide-up animate-stagger-2">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message here..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={!inputVal.trim() || isTyping}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;