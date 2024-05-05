import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams, Link } from 'react-router-dom';


// Books Page Component
const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://softwium.com/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, []);

  return (
    <div>
      <div className='book'>
        <h1>BOOKS</h1>

      </div>

      <div className='main'>
        {books.map(book => (
          <div key={book.id}>
            <a href={`/books/${book.id}`}>{book.title}</a>
          </div>


        ))}
      </div>
    </div>






  );
};


const BookDetailsPage = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://softwium.com/api/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      })
  }, [id]);

  // If the book data hasn't loaded yet, display a loading message
  if (!book) {
    return <div>Loading...</div>;
  }

  // Once the book data has loaded, display the book details
  return (
    <div>
      <div className='bookdetails'>
        <h1 className='title'>{book.title}</h1>
        <p className='isbn'>ISBN: {book.isbn}</p>
        <p className='pageCount'>Page Count: {book.pageCount}</p>
        <p className='authors'>Authors: {book.authors.join(', ')}</p>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link className='go' to="/books">Go Back</Link>
      </div>
    </div>



  );
};


// App Component
const App = () => (
  <Router>
    <Routes>
      <Route path="/books/:id" element={<BookDetailsPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/" element={<Navigate to="/books" />} />
    </Routes>
  </Router>
);

export default App;
