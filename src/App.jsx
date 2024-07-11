import './App.css'
import { useState } from 'react';
import UsernameInput from './components/UsernameInput';
import ChatRoom from './components/ChatRoom';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <h1>React Chat Room</h1>
      {!username ? (
        <UsernameInput setUsername={setUsername} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;