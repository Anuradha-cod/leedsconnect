
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
    {/*
  
    <header>header</header>
      <section>
        <nav>
          <ul>1</ul>
          <ul>1</ul>
          <ul>1</ul>

        </nav>
        <article>
          <h1>article</h1>
          <p>description</p>
        </article>
      </section>
      <footer>
      footer
      </footer>
  */}
    
  <Header />
    
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
