import React from 'react';
import Card from './card';

const CardList = (props) => {
    
    let display = props.info.map((item, index) => {
        return (
          
             <Card   temp = {item.weather}
                    pic = {item.miniIcon}
                    key = {index}
                    description = {item.outlook}
                    time = {item.date}></Card>
                       
           )
    })
    return (
        <div id='table'>
         {display}
        </div>
    );
}

export default CardList;