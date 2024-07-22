import { useState } from "react";
import "./Form.css";



function Form( {addReservation} ) {
  const [name, setname] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [number, setnumber] = useState("");

  function submitReservations(event) {
    event.preventDefault();
    const newReservation = {
      id: Date.now(),
      name: name,
      date: date,
      time: time,
      number: number,
    };
    addReservation(newReservation);
    clearInput();
  }
  function clearInput() {
    setname("");
    setdate("");
    settime("");
    setnumber("");
  }

  return (
    <form>
      <input type="text" placeholder="name" name="name" value={name} />

      <input type="text" placeholder="date" name="date" value={date} />

      <input type="text" placeholder="time" name="time" value={time} />

      <input type="text" placeholder="number" name="number" value={number} />

      <button onClick = { event => submitReservations(event)}>SUBMIT</button>
    </form>
  );
}

export default Form;
