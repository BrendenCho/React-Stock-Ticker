import React from 'react';
import "./App.css"
class Box extends React.Component{

constructor(props){
super();

this.state = {
companyName: props.companyName,
symbol: props.symbol,
price: props.price,
openingPrice: props.openingPrice,
percentChange:0,
tickColor:"black"
}

}

static getDerivedStateFromProps(props, state) {

    if (props.price != state.price || props.companyName != state.companyName) {

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
            tickColor: c,
            companyName:props.companyName
        };

    }
    return null;
}


componentDidUpdate(prevProps, prevState) {
    if (this.props.selected !== prevProps.selected) {
        this.selectNew();
    }

}


render(){

return <div className="Box">
    <h2>{this.state.companyName}</h2>
    <h2> {this.state.symbol}</h2>
    <h2>{this.state.price} </h2>
<h2 style={{color:this.state.tickColor}}> {this.state.percentChange + "%"}</h2>

    </div>
}


}

export default Box