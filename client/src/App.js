import React from 'react';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <SearchBar />
      <Dashboard />
    </div>
  );
}

export default App;