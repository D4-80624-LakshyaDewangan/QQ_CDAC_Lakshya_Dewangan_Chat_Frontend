import React, { useState, useEffect } from 'react';
// import './App.css';

function Chat({name}) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:6969');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
        console.log(message)
        message.data.text().then((text) => {
            const data=JSON.parse(text)
            const newMessages = [...messages, { sender: 'receiver', content: data.content,name:data.name }];
            console.log(newMessages);
            setMessages(newMessages);
          });
    };

    setWs(ws);

    return () => {
      ws.close();
    };
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage && ws) {
      ws.send(JSON.stringify({ name: name, content: inputMessage }));
      const newMessages = [...messages, { sender: 'sender', content: inputMessage,name:name }];
      console.log(newMessages)
    setMessages(newMessages);
      setInputMessage('');
    }
  };

  return (
    <div className="App">
      <h1>{`hello ${name}`}</h1>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="messages">
        
        {messages.map((message, index) => (
            <div className='wrapper'>
                <div className={message.sender=="sender"?"rname":"lname"}>{message.sender=="sender"?"me":message.name }</div>
    <div key={index} className={`message ${message.sender}`}>{message.content}</div>
            </div>
         
        ))}
      </div>
    </div>
  );
}

export default Chat;
