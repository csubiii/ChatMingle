import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null); // Declare socket state

  useEffect(() => {
    const newSocket = io('ws://localhost:3002');

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('chat message', message);
      setMessage('');
    } else {
      console.error('Socket is not connected');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
