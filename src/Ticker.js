import React from 'react';
import './App.css';


class Ticker extends React.Component {

    constructor(props) {
        super();

        this.state = {
            symbol: props.symbol,
            price: props.price,
            openingPrice: props.openingPrice,
            percentChange: 0,
            tickColor: "black"
        }

    }

    static getDerivedStateFromProps(props, state) {

        if (props.price != this.state.price) {

            let x = props.price;

            x = calcChange(this.state.openingPrice, x);

            let c = chooseColor(x);

            return {
                price: props.price,
                percentChange: this.x,
                tickColor: c
            };

        }
        return null;
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.selected !== prevProps.selected) {
            this.selectNew();
        }

    }



    calcChange(open, curr) {
        let p = (curr - open) / open;
        p = p.toFixed(2);
        return p;
    }

    chooseColor(c) {
        if (c === 0) {
            return "black";
        } else if (c > 0) {
            return "green";
        } else {
            return "red";
        }

    }



    render() {

        return (
            <div className="ticker">
                <h1> {this.state.symbol}</h1>
                <h1 style={{ color: this.state.tickColor }}> {this.state.percentChange} </h1>
            </div>
        );

    }

}

export default Ticker