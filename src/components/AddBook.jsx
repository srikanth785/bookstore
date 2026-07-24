import { useState } from 'react';

//const API_URL = 'https://bookstoreback-production.up.railway.app/api/books';
const API_URL = 'https://https://bookstorenew.onrender.com/api/books';

function AddBook({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    isbn: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      alert('Title and Author are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to add book');

      setFormData({ title: '', author: '', price: '', isbn: '' });
      onBookAdded();
      alert('Book added successfully!');
    } catch (err) {
      alert('Error adding book: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Book Title *"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="author"
            placeholder="Author *"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
