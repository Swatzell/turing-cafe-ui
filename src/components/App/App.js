import './App.css';
import React from 'react';
import Reservations from '../Reservations/Reservations';
import Form from '../Form/Form';
import { useState } from 'react';

function App() {
  return (
    <main className="App">
      <h1 className='app-title'>Turing Cafe Reservations</h1>
      <div className='resy-form'>
      </div>
      <div className='resy-container'>
      </div>
    </main>
  );
}

export default App; 