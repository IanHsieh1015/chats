// src/components/UsernameInput.js
import { useState } from 'react';

const UsernameInput = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState('');

  const handleInputChange = (event) => {
    setUsernameInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername(usernameInput.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your username:
        <input type="text" value={usernameInput} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UsernameInput;
