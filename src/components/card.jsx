import React from 'react';
import './card.css';

const Card = ({pic = '', temp = 0, description = '', time = ''}) => {
    if ((time === '') || new Date().getDate() === time.getDate()) {
        return null;
    }
    const parsedDate = time.toString().split(" ");
    const date = parsedDate[0] + ' ' + parsedDate[1] + ' ' + parsedDate[2];  
    
    const iconUrl = `http://openweathermap.org/img/w/${pic}.png`;
     
    return (
        <div id='thumbnail'>
            <p id='date'>{date}</p>
           
            <img src={iconUrl} alt='weather icon' />
            <span className='temperature'>{temp}</span>

            <p>{description}</p>
        </div>
    );
}

export default Card;