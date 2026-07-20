import { useState } from 'react'
import './App.css'
import AddBook from './components/AddBook'
import BookList from './components/BookList'
import SearchBooks from './components/SearchBooks'

function App() {
  const [activeTab, setActiveTab] = useState('all')
  const [refresh, setRefresh] = useState(0)

  const handleBookAdded = () => {
    setRefresh((prev) => prev + 1)
    setActiveTab('all')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bookstore Manager</h1>
      </header>

      <nav className="tab-nav">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Books
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Book
        </button>
        <button
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'all' && <BookList refresh={refresh} />}
        {activeTab === 'add' && <AddBook onBookAdded={handleBookAdded} />}
        {activeTab === 'search' && <SearchBooks />}
      </main>
    </div>
  )
}

export default App
