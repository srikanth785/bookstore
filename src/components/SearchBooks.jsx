import { useState } from 'react';
import BookCard from './BookCard';

const API_URL = 'https://bookstoreback-production.up.railway.app/api/books';

function SearchBooks() {
  const [searchType, setSearchType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(
        `${API_URL}/search?${searchType}=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      alert('Error searching: ' + err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete book');
      setResults(results.filter((book) => book.id !== id));
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

      const updatedData = await response.json();
      setResults(results.map((book) => (book.id === id ? updatedData : book)));
    } catch (err) {
      alert('Error updating book: ' + err.message);
    }
  };

  return (
    <div className="search-books">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">By Title</option>
            <option value="author">By Author</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searched && (
        <div className="search-results">
          <h3>Search Results ({results.length})</h3>
          {loading ? (
            <div className="loading">Searching...</div>
          ) : results.length === 0 ? (
            <p className="no-books">No books found matching your search.</p>
          ) : (
            <div className="books-grid">
              {results.map((book) => (
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
      )}
    </div>
  );
}

export default SearchBooks;
