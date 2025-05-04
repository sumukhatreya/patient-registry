import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Home from './Home';
import Nav from './Nav';
import PatientRegister from './PatientRegister';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <div className='app'>
          <Nav />
          <div className='content'>
            <Routes>
              <Route exact path='/' element={<Navigate to="/patients" replace />}/>
              <Route exact path='/patients' element={<Home />}/>
              <Route exact path='/register' element={<PatientRegister />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
