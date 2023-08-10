import React, { useState } from "react";
import { format } from "date-fns";
import "./ChatApp.css";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [lastUsedUser, setLastUsedUser] = useState("");
  const [showUserList, setShowUserList] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const availableUsers = user_list.filter((user) => user !== lastUsedUser);
    const randomUser =
      availableUsers[Math.floor(Math.random() * availableUsers.length)];

    const newMessage = {
      user: randomUser,
      text: message,
      likes: 0,
      timestamp: new Date(),
    };

    const updatedMessages = [...chatMessages];

    if (
      updatedMessages.length > 0 &&
      updatedMessages[updatedMessages.length - 1].user === randomUser
    ) {
      updatedMessages[updatedMessages.length - 1].text += `\n${message}`;
    } else {
      updatedMessages.push(newMessage);
    }

    setChatMessages(updatedMessages);
    setMessage("");
    setLastUsedUser(randomUser);
    setShowUserList(false);
  };

  const handleLike = (index) => {
    const updatedMessages = [...chatMessages];
    updatedMessages[index].likes += 1;
    setChatMessages(updatedMessages);
  };

  const handleUserMention = (username) => {
    setMessage(message + ` @${username} `);
    setShowUserList(false);
  };

  return (
    <div className="chat-container">
      <h1 className="app-heading">
        Exact<span className="highlight">Space</span> ChatApp
      </h1>
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div key={index} className="chat-message">
            <span className="chat-username">{msg.user}:</span>
            <span className="chat-text">{msg.text}</span>
            <span className="chat-timestamp">
              {format(msg.timestamp, "HH:mm:ss")}
            </span>
            <button className="like-button" onClick={() => handleLike(index)}>
              ❤️
            </button>
            <span className="like-count">{msg.likes}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "@") setShowUserList(true);
          }}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {showUserList && (
        <div className="user-list">
          {user_list.map((user, index) => (
            <div
              key={index}
              className="user-list-item"
              onClick={() => handleUserMention(user)}>
            
              {user}
            </div>
           ))}
        </div>
      )}
     </div>
  );
};

export default ChatApp;