import { useState } from 'react';

function BookCard({ book, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: book.title,
    author: book.author,
    price: book.price || '',
    isbn: book.isbn || '',
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    if (!editData.title || !editData.author) {
      alert('Title and Author are required');
      return;
    }

    onUpdate(book.id, {
      ...editData,
      price: parseFloat(editData.price) || 0,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: book.title,
      author: book.author,
      price: book.price || '',
      isbn: book.isbn || '',
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="book-card editing">
        <input
          type="text"
          name="title"
          value={editData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="author"
          value={editData.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <input
          type="number"
          name="price"
          value={editData.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
        />
        <input
          type="text"
          name="isbn"
          value={editData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
        />
        <div className="card-actions">
          <button onClick={handleUpdate} className="btn-save">
            Save
          </button>
          <button onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p className="author">by {book.author}</p>
      {book.price && <p className="price">${parseFloat(book.price).toFixed(2)}</p>}
      {book.isbn && <p className="isbn">ISBN: {book.isbn}</p>}
      <p className="book-id">ID: {book.id}</p>
      <div className="card-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this book?')) {
              onDelete(book.id);
            }
          }}
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
