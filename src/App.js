import React from 'react';
import './App.css';
import Ticker from "./Ticker"
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
      openingPrice: 0
    }

  }

  componentDidMount() {

    const str = "https://finnhub.io/api/v1/quote?symbol=" + this.state.symbol + "&token=" + this.state.apiKey;
    console.log(str);
    fetch(str)
      .then(responce => responce.json())
      .then(data => this.setState({
        mainData: data
      }))
      .then(() => this.setState({
        price: this.state.mainData.c,
        openingPrice: this.state.mainData.o

      }))


    const s = "https://finnhub.io/api/v1/stock/profile2?symbol=" + this.state.symbol + "&token=" + this.state.apiKey;
    console.log(s);
    fetch(s)
      .then(responce => responce.json())
      .then(data => this.setState({
        companyData: data
      })).then(() => { console.log(this.state.companyData.name) })

    this.interval = setInterval(() => {
      const str = "https://finnhub.io/api/v1/quote?symbol=" + this.state.symbol + "&token=" + this.state.apiKey;
      console.log(str);
      fetch(str)
        .then(responce => responce.json())
        .then(data => this.setState({
          mainData: data
        }))
        .then(() => this.setState({
          price: this.state.mainData.c,
          openingPrice: this.state.mainData.o

        }))
    }, 60000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);

  }

  render() {
    let v = 0;
    return <Ticker symbol={this.state.symbol} price={this.state.price} openingPrice={this.state.openingPrice} />;
  }




}

export default App;
