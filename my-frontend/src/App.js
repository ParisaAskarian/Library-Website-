import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import LibrarianPage from './components/LibrarianPage';
import SearchAIPage from './components/SearchAIPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/librarian" element={<LibrarianPage />} />
        <Route path="/search-ai" element={<SearchAIPage />} />
        <Route path="*" element={<h2 className='NoPage'>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;