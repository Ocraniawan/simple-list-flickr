import React from 'react'
import './App.css';
import Home from './components/home/Home';
import Navbar from './parts/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
