// App.js
import './App.css';
import { useState } from 'react';
import ProductList from './Components/ProductList';
import Navbar from './Components/Navbar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} /> 
      <ProductList searchTerm={searchTerm} /> 
    </div>
  );
}

export default App;
