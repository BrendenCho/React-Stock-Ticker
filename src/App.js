import React from 'react';
import './App.css';
import Ticker from "./Ticker"
import Box from "./Box"
import { render } from '@testing-library/react';
require('dotenv').config();

class App extends React.Component {

  constructor(props) {
    super();

    this.state = {
      symbol: props.symbol,
      apiKey: process.env.REACT_APP_API_KEY,
      mainData: {},
      companyData: {},
      price: 0,
      openingPrice: 0,
      companyName:""
    }

  }

  componentDidMount() {

    const str = "https://finnhub.io/api/v1/quote?symbol=" + this.state.symbol + "&token=" + this.state.apiKey;
   
    fetch(str)
      .then(responce => responce.json())
      .then(data => this.setState({
        mainData: data
      }))
      .then(() => this.setState({
        price: this.state.mainData.c,
        openingPrice: this.state.mainData.pc

      }))
      .then(()=>{
        console.log(this.state.mainData);
      })


    const s = "https://finnhub.io/api/v1/stock/profile2?symbol=" + this.state.symbol + "&token=" + this.state.apiKey;
    
    fetch(s)
      .then(responce => responce.json())
      .then(data => this.setState({
        companyData: data,
        
      })).then(() => { console.log(this.state.companyData) })
      .then(()=>{
        this.setState({

          companyName:this.state.companyData.name


        }  
          )


      })

    this.interval = setInterval(() => {
      const str = "https://finnhub.io/api/v1/quote?symbol=" + this.state.symbol + "&token=" + this.state.apiKey;
    
      fetch(str)
        .then(responce => responce.json())
        .then(data => this.setState({
          mainData: data
        }))
        .then(() => this.setState({
          price: this.state.mainData.c,
          openingPrice: this.state.mainData.pc

        }))
    }, 60000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);

  }

  render() {

    return<div> 
    <Ticker symbol={this.state.symbol} price={this.state.price} openingPrice={this.state.openingPrice} />
    <Box companyName={this.state.companyName} symbol={this.state.symbol} price={this.state.price} openingPrice={this.state.openingPrice}/>

    </div>
  }




}

export default App;
