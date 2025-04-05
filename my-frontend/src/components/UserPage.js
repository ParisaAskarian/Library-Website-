import React, { useState } from 'react';
import './UserStyle.css';

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const books = [
    { id: 1, title: 'Shahname', author: 'Ferdosi' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ];

  const user = {
    name: 'Parisa Askarian',
    email: 'parisa@example.com',
    borrowedBooks: ['1984'],
    reservedBooks: ['The Great Gatsby'],
    fines: 10000,
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Fines: {user.fines}Toman</p>
      <button>Pay Fines</button>
      <h3 className='borrow' >Borrowed Books</h3>
      <ul id='part1'>
        {user.borrowedBooks.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
      <h3 className='reserve center'>Reserved Books</h3>
      <ul id='part1'  >
        {user.reservedBooks.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
      <h3 id='search'>Search for a Book</h3>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className='bookInformation'>
        {filteredBooks.map((book) => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;