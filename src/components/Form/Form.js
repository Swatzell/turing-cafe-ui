import { useState } from "react";
import "./Form.css";

function Form({ addReservation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  function submitReservations(event) {
    event.preventDefault();
    if (!name || !date || !time || !number) {
      setError("All fields are required.");
      return;
    }

    const newReservation = {
      name: name,
      date: date,
      time: time,
      number: number, 
    };

    fetch('http://localhost:3001/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReservation),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add reservation');
        }
        return response.json();
      })
      .then(data => {
        addReservation(data); 
        clearInput();
        setError(""); 
      })
      .catch(error => {
        setError('Error adding reservation: ' + error.message);
      });
  }

  function clearInput() {
    setName("");
    setDate("");
    setTime("");
    setNumber("");
  }

  return (
    <form>
      {error && <p className="error">{error}</p>}
      <input 
        type="text" 
        placeholder="name" 
        name="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="date" 
        name="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="time" 
        name="time" 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="number" 
        name="number" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
      />
      <button onClick={submitReservations}>SUBMIT</button>
    </form>
  );
}

export default Form;