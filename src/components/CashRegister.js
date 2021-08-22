import React from "react";
import Display from "./Display.js"
import RegisterButton from "./RegisterButton.js";

/*
TODO:
    - Make pretty
    - Finish writing out tests to be more general
    - Begin API integration
*/

class CashRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: 0,
            prompt: "Purchase Price:",
            enteringPurchasePrice: true
        };

        this.purchase = 0;
        this.payment = 0;

        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleCalculateChange = this.handleCalculateChange.bind(this);
    }

    handleCalculateChange() {
        this.purchase = 0;
        this.payment = 0;

        this.setState({
            displayText: 0,
            prompt: "Purchase Price:", 
            enteringPurchasePrice: true,
            enteringPaymentPrice: false
        })
    }

    handleClick(event) {
        // retrieve the number pressed from the click event
        let eventChar = event.nativeEvent.path[0].firstChild.data

        // preprocess string before updating state
        let newText = this.parseDisplayText(this.state.displayText, eventChar)

        this.setState({ displayText: newText });
    }

    handleEnter() {
        if (this.state.enteringPurchasePrice) {
            this.purchase = this.state.displayText;
            this.setState({
                displayText: 0,
                prompt: "Payment Amount:",
                enteringPurchasePrice: !this.state.enteringPurchasePrice,
                enteringPaymentPrice: !this.state.enteringPaymentPrice
            })
        } else if (this.state.enteringPaymentPrice) {
            this.payment = this.state.displayText;
            // calculate new display text for change amount HERE
            let change = "Change entered here";
            this.setState({
                displayText: 1000,
                prompt: "Change Amount:",
                enteringPurchasePrice: false,
                enteringPaymentPrice: !this.state.enteringPaymentPrice
            })
        } else {
            this.setState({
                displayText:0,
                prompt: "Purchase Price:",
                enteringPurchasePrice: true,
                enteringPaymentPrice: false
            })
        }
    }

    parseDisplayText(displayText, eventChar) {
        let newText;

        // if the delete button was clicked, handle accordingly
        if (eventChar === "Delete") {
            newText = displayText.toString().length === 1 ? 0 : displayText.toString().slice(0, displayText.length - 1)
        }
        // check if current string is zero and handle accordingly 
        else if (displayText === 0 && eventChar !== ".") {
            newText = eventChar;
        } else if (displayText === 0 && eventChar === ".") {
            newText = displayText.toString() + eventChar.toString();
        } else {
            newText = displayText.toString() + eventChar.toString();
        }

        // check that no more than one decimal is in the string
        let splitString = newText.toString().split(".")
        if (splitString.length > 2) {
            newText = splitString[0] + "." + splitString[1];
        }
        // check here that no more than two numbers follow decimal
        else if (splitString.length === 2) {
            let decimals = splitString[1];
            if (decimals.length > 2) {
                newText = splitString[0] + "." + splitString[1].slice(0, 2);
            }
        }

        return newText
    }

    render() {
        return (
            <div className="Cash-Register container">
                <div className="Register-buttons col-md-8">
                    <div className="container">
                        <div className="row">
                            <RegisterButton name="1" onClick={this.handleClick} />
                            <RegisterButton name="2" onClick={this.handleClick} />
                            <RegisterButton name="3" onClick={this.handleClick} />
                        </div>
                        <div className="row">
                            <RegisterButton name="4" onClick={this.handleClick} />
                            <RegisterButton name="5" onClick={this.handleClick} />
                            <RegisterButton name="6" onClick={this.handleClick} />
                        </div>
                        <div className="row">
                            <RegisterButton name="7" onClick={this.handleClick} />
                            <RegisterButton name="8" onClick={this.handleClick} />
                            <RegisterButton name="9" onClick={this.handleClick} />
                        </div>
                        <div className="row">
                            <RegisterButton name="0" onClick={this.handleClick} />
                            <RegisterButton name="." onClick={this.handleClick} />
                            <RegisterButton name="Delete" onClick={this.handleClick} />
                        </div>
                    </div>
                </div>

                <div className="Register-right col-lg-4">
                    <div className="Register-display">
                        <Display amount={this.state.displayText} prompt={this.state.prompt} />
                    </div>
                    <div className="Register-right-buttons">
                        <RegisterButton name="Reset" onClick={this.handleCalculateChange}/>
                        <RegisterButton name="Enter" onClick={this.handleEnter} />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default CashRegister;