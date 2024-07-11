// src/components/ChatRoom.jsx
import { useState, useEffect } from 'react';
import generateUserId from '../uuid';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = generateUserId();
    setUserId(storedUserId);

    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessages = [...messages, { text: newMessage, timestamp: new Date(), userId }];
    setMessages(newMessages);
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.timestamp.toLocaleTimeString()} {message.userId === userId ? 'You' : `User ${message.userId.slice(0, 4)}`}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
