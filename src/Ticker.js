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

        if (props.price != state.price) {

            let x = props.price;

            x = ((props.price - props.openingPrice)/props.openingPrice)*100;
            x = x.toFixed(2);

            let c = "";
           
            if (x === 0) {
                c = "black";
            } else if (Math.sign(x) === -1) {
                c = "red";
            } else {
                c=  "green";
            }
    

            return {
                price: props.price,
                percentChange: x,
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





    render() {

        return (
            <div className="ticker">
                <h1> {this.state.symbol}</h1>
                <h1 style={{ color: this.state.tickColor }}> {this.state.percentChange + "%"} </h1>
            </div>
        );

    }

}

export default Ticker