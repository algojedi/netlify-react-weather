import React from 'react';
import './mainCard.css';

const MainCard = (props) => {
    const {city, temp, humidity, wind, desc, vis, metric} = props.allInfo;
    const units = metric ? ' km/h' : ' mph';
    
    return (
        <div className='container'>
            <div id='city'>
                {city}
            </div>

            <div id='temp'>
                {temp} 
            </div>

            <button className={metric ? 'selected' : 'unselected'} 
                    onClick={props.handleClick} 
                    id='cel'>&#8451;</button>
            <button className={!metric ? 'selected' : 'unselected'}
                    onClick={props.handleClick} 
                    id='far'>&#8457;</button>
            
            <div id='currSky'>
                {desc}
             </div>

            <div id='wind'>
                Wind : {wind} {units}
            </div>

            <div id='humid'>
                Humidity : {humidity}%
            </div>

            <div id='vis'>
                Visibility : {vis} km
            </div>

        </div>
    );
}

export default MainCard;