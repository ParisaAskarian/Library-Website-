import React, { useState } from 'react';

const LibrarianPage = () => { // State for books
 const [books, setBooks] = useState([ { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }, { id: 2, title: '1984', author: 'George Orwell' }, ]); const [newBook, setNewBook] = useState({ title: '', author: '' });

// State for users 
const [users, setUsers] = useState([ { id: 1, name: 'John Doe', email: 'john@example.com' }, { id: 2, name: 'Jane Smith', email: 'jane@example.com' }, ]); const [newUser, setNewUser] = useState({ name: '', email: '' });

// Add a new book 
const addBook = () => { if (newBook.title && newBook.author) { setBooks([...books, { id: books.length + 1, ...newBook }]); setNewBook({ title: '', author: '' }); } };

// Remove a book
const removeBook = (id) => { setBooks(books.filter((book) => book.id !== id)); };

// Add a new user 
const addUser = () => { if (newUser.name && newUser.email) { setUsers([...users, { id: users.length + 1, ...newUser }]); setNewUser({ name: '', email: '' }); } };

// Remove a user 
const removeUser = (id) => { setUsers(users.filter((user) => user.id !== id)); };

return (
<div>
  <h2>Librarian Dashboard</h2>
  {/* Add a new book */}
  <h3>Add a New Book</h3>
  <input
    type="text"
    placeholder="Title"
    value={newBook.title}
    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
  />
  <input
    type="text"
    placeholder="Author"
    value={newBook.author}
    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
  />
  <button onClick={addBook}>Add Book</button>

  {/* Books List */}
  <h3>Books List</h3>
  <ul>
    {books.map((book) => (
      <li key={book.id}>
        {book.title} by {book.author}{' '}
        <button onClick={() => removeBook(book.id)}>Remove</button>
      </li>
    ))}
  </ul>

  <hr />

  {/* Add a new user */}
  <h3>Add a New User</h3>
  <input
    type="text"
    placeholder="Name"
    value={newUser.name}
    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
  />
  <input
    type="email"
    placeholder="Email"
    value={newUser.email}
    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
  />
  <button onClick={addUser}>Add User</button>

  {/* Users List */}
  <h3>Users List</h3>
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        {user.name} ({user.email}){' '}
        <button onClick={() => removeUser(user.id)}>Remove</button>
      </li>
    ))}
  </ul>
</div>
); };

export default LibrarianPage;