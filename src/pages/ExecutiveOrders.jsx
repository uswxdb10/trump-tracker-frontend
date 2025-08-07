import React, { useState } from 'react';
import axios from 'axios';

export default function ExecutiveOrders() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const summarize = async () => {
    try {
      const response = await axios.post('https://trump-tracker-backend.onrender.com/summarize', {
        text: inputText
      });
      setSummary(response.data.summary);
      setError('');
    } catch (err) {
      setError('Error: ' + (err.response?.data?.detail || 'Request failed'));
    }
  };

  return (
    <div>
      <h2>Summarize Executive Order</h2>
      <textarea
        rows={6}
        cols={60}
        placeholder="Paste executive order text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={summarize}>Summarize</button>
      {summary && <p><b>Summary:</b> {summary}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

