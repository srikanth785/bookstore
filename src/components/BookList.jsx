import { useState, useEffect } from 'react';
import BookCard from './BookCard';

const API_URL = 'https://bookstoreback-production.up.railway.app/api/books';

function BookList({ refresh }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/allbooks`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete book');
      fetchBooks();
    } catch (err) {
      alert('Error deleting book: ' + err.message);
    }
  };

  const handleUpdate = async (id, updatedBook) => {
    try {
      const response = await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) throw new Error('Failed to update book');
      fetchBooks();
    } catch (err) {
      alert('Error updating book: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="book-list">
      <h2>All Books ({books.length})</h2>
      {books.length === 0 ? (
        <p className="no-books">No books found. Add your first book!</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
