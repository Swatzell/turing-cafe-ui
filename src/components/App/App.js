import './App.css';
import React, { useState, useEffect } from 'react';
import Reservations from '../Reservations/Reservations';
import Form from '../Form/Form';
import Card from '../Card/Card';

function App() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/reservations')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  function addReservation(newReservation) {
    setReservations([...reservations, newReservation]);
  }

  function deleteReservation(id) {
    fetch(`http://localhost:3001/api/v1/reservations/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete reservation');
        }
        const filteredReservations = reservations.filter(reservation => reservation.id !== id);
        setReservations(filteredReservations);
      })
      .catch(error => console.error('Error deleting reservation:', error));
  }

  return (
    <main className="App">
      <h1 className='app-title'>Turing Cafe Reservations</h1>
      {!reservations.length && <h2>No reservations yet -- add some!</h2>}
      <Form addReservation={addReservation} />
      <Reservations reservations={reservations} deleteReservation={deleteReservation} />
    </main>
  );
}

export default App;