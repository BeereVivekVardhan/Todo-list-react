import './App.css'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>✓ Task Manager</h1>
          <p>Organize your tasks efficiently</p>
        </div>
      </header>
      <main className="app-main">
        <TodoList />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; Task Manager {new Date().getFullYear()} - Built with React, TypeScript, Express & MongoDB</p>
        </div>
      </footer>
    </div>
  )
}

export default App
