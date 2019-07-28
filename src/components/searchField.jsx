import React from 'react';

const SearchField = (props) => {
    
    return (
        <div id='search'>
            <button onClick={props.onUserEnter}
                    type='submit'
                    className='fa fa-arrow-circle-right'></button>
            <input  onChange={props.onTextChange} 
                    type='text' 
                    placeholder='enter a city...' 
                    value = {props.cityName}   
                    onKeyDown={props.onEnter}   
                    />
        </div>
    );
}
 
export default SearchField;