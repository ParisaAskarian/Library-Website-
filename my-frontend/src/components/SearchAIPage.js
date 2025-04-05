import React, { useState } from 'react';

const SearchAIPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const askAI = () => {
    // Simulate AI response
    const suggestions = {
      thriller: 'The Girl with the Dragon Tattoo',
      romance: 'Pride and Prejudice',
      fantasy: 'The Hobbit',
    };

    const genre = query.toLowerCase();
    setResponse(suggestions[genre] || 'Sorry, I don’t have suggestions for that.');
  };

  return (
    <div>
      <h2 id='AI'>Chat with AI</h2>
      <input
        id='AI-input'
        type="text"
        placeholder="Ask about books (e.g., 'thriller')"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={askAI}>Ask AI</button>
      <p>{response}</p>
    </div>
  );
};

export default SearchAIPage;