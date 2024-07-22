import './Card.css';


function Card({ id, name, date, time, number, deleteReservation}){
    return (
      <div className='card'>
        <h3>{name}</h3>
        <h4>{date}</h4>
        <h4>{time}</h4>
        <h4>{number}</h4>
        <button onClick={()=> deleteReservation(id)}>Cancel</button>
      </div>
    )
  }

export default Card;