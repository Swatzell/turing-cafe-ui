import React from 'react';
import Card from '../Card/Card';
import './Reservations.css';

function Reservations({ reservations, deleteReservation }) {
  return (
    <div className='reservations-container'>
      {reservations.map(reservation => (
        <Card 
          key={reservation.id} 
          {...reservation} 
          deleteReservation={deleteReservation} 
        />
      ))}
    </div>
  );
}

export default Reservations;