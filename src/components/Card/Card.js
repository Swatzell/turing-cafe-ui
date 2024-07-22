import './Card.css';

function Card({ name, date, time, number}){
    return (
      <div className='card'>
        <h3>{name}</h3>
        <h4>{date}</h4>
        <h4>{time}</h4>
        <h4>{number}</h4>
        <button>Cancel</button>
      </div>
    )
  }

export default Card;