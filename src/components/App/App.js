import './App.css';
import React from 'react';
import Reservations from '../Reservations/Reservations';
import Form from '../Form/Form';
import { useState } from 'react';

function App() {
  const dummyReservations = [
    {
    id: 1,
    name: 'Christie',
    date: '12/29',
    time: '7:00',
    number: 12,
  },
  {
    id: 2,
    name: 'Leta',
    date: '4/5',
    time: '7:00',
    number: 2,
  },
  {
    id: 3,
    name: 'Pam',
    date: '1/21',
    time: '6:00',
    number: 4,
  },
]
  const [reservations, setReservations] = useState(dummyReservations);
  return (
    <main className="App">
      <h1 className='app-title'>Turing Cafe Reservations</h1>
    <Reservations/>
    </main>
  );
}

export default App; 