import { useState } from 'react';

export default function App() {
  const [updated, setUpdated] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUpdated(event.target.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        onKeyDown={handleKeyDown}
      />

      <h2>Updated: {updated}</h2>
    </div>
  );
}