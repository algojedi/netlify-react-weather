import React, { Component } from 'react';
import logo from './logo.svg';
import SearchField from './components/searchField';
import CardList from './components/cardList';
import MainCard from './components/mainCard';

import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      city : '',
      temp : 0,
      longDesc : '',
      desc: '',
      humidity : 0,
      vis: 0,
      wind : '',
      lookup: 'toronto',
      icon: '',
      fiveDay : [{}],
      metric : true,
      isLoading1 : false,
      isLoading2: false
      
    }
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUnitChange = this.onUnitChange.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
  }
  
  //very light check
  isValid(checkCity) {
    return checkCity === '' ? false : true;
  }

  componentDidMount() {
    this.setState({ isLoading1: true, isLoading2: true});
    this.fetchInfo(this.state.lookup);
  }
  
  handleText(evt) {
    this.setState({ lookup: evt.target.value })
  }

  fetchInfo(userCity) {
    const units = this.state.metric ? '&units=metric' : '&units=imperial';
    const windOffset = this.state.metric ? 3.6 : 1;

    fetch('/.netlify/functions/oneDay?city=' + userCity + units)
      .then(resp => resp.json()) // Convert data to json
      .then(data => {
        
        this.setState({
          city: data.name,
          temp: Math.trunc(data.main.temp),
          desc: data.weather[0].main,
          humidity: data.main.humidity,
          icon: data.weather[0].icon,
          wind: Math.round(data.wind.speed * windOffset*10)/10,
          vis: Math.trunc(data.visibility / 1000),
          lookup: '',
          isLoading1: false
        });
      })
      .catch(err => alert("Sorry, we couldn't find that city. Please try again."));

    //get 5 day data 
    fetch('/.netlify/functions/fiveDay?city=' + userCity + units)
      .then(resp => resp.json()) // Convert data to json
      .then(data => {
        this.calcForecast(data);
      })
      .catch(err => console.log('there was an error fetching 5 day'));
  }

  handleSubmit() {
    let userCity = this.state.lookup;
     if (!this.isValid(userCity) ) {
      alert('incorrect city');
      return;
    }
    this.fetchInfo(userCity);
  }

  //takes in the 5day fields from state
  calcForecast(forecast) {
    
    let newArray = forecast.list.map(item => {
            let obj = {};
            obj.date = new Date(item.dt*1000);
            obj.weather = Math.trunc(item.main.temp);
            obj.outlook = item.weather[0].main;
            obj.miniIcon = item.weather[0].icon;
            return obj;
        })
    const today = new Date().getDate();
    const filterArray = newArray.filter(el => {
      return (el.date.getHours() === 12 ||
             el.date.getHours() === 13 || 
             el.date.getHours() === 14) &&
             !(el.date.getDate() === today) ;
    });
   
    this.setState({ fiveDay : filterArray,
                    isLoading2: false });
  }

  onUnitChange(evt) {
    //return early if no need for change
    if (this.state.metric && evt.target.id === 'cel') return;
    if (!this.state.metric && evt.target.id === 'far') return;

    const convertToCel = evt.target.id === 'cel' ? true : false; 
    
    //setTimeout needed ensure proper URL is fetched
    this.setState({ metric : convertToCel});
    setTimeout(() => {
      this.fetchInfo(this.state.city)
    }, 0); 
  }

  handleKeyPress = evt => {
    if (evt.keyCode === 13) this.handleSubmit();
  }

  render() { 
    
    if (this.state.isLoading2 || this.state.isLoading1) {
      return <p>Loading ...</p>;
    }
   
    return (  
      <div>

        <div class="reactWrapper">
          <span>Made with</span>
          <img src={logo} className="App-logo" alt="logo" style={{ height : '50px' }} />
          <span className="react">React</span>
        </div>

        <div className='searchWrapper'>
          <SearchField onTextChange={this.handleText}
                       onUserEnter={this.handleSubmit}
                       cityName={this.state.lookup} 
                       onEnter={this.handleKeyPress}
                       />
        </div>

        <hr/>
        
        <div id="mainCrd">
          <MainCard allInfo={this.state} handleClick={this.onUnitChange} />
        </div>

        <div className='listContainer' id='wrapper'>
          <CardList info = {this.state.fiveDay}/>
        </div>

        <hr/>
        <p className='author'> Created by: S. Banwait</p>
        <br/>
        <br />
        <br />

      </div>

    );
  }
}
 
export default App;


