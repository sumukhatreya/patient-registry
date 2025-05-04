import { useState, useEffect } from 'react';
import Home from './Home';
import Nav from './Nav';

const App = () => {

  return (
    <div className='app'>
      <Nav />
      <div className='content'>
        <Home />
      </div>
    </div>
  );
}

export default App
