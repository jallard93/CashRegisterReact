import React from "react";
import Display from "./Display.js"
import RegisterButton from "./RegisterButton.js";
import ChangeList from "./ChangeList"
import $ from "jquery";

class CashRegister extends React.Component {
    constructor(props) {
        super(props);
        // set state variables
        this.state = {
            displayText: 0,
            prompt: "Purchase Price:",
            enteringPurchasePrice: true,
            enteringPaymentPrice: false,
            showChange: false,
            change: []
        };

        // set API related varaibles
        this.purchase = 0;
        this.payment = 0;
        this.billCounts = {0.01: 10,
                           0.05: 10,
                           0.10: 10,
                           0.25: 10,
                           0.50: 10,
                           1.00: 10,
                           5.00: 10,
                           10.00: 10,
                           20.00: 10
        }
        this.totalBills = Object.values(this.billCounts).reduce((a, b) => a + b, 0);

        //bindings
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.handleOpenDrawer = this.handleOpenDrawer.bind(this);
    }

    // handles resetting the ui and related variables/states
    handleReset() {
        this.purchase = 0;
        this.payment = 0;
        this.billCounts = {
            0.01: 10,
            0.05: 10,
            0.10: 10,
            0.25: 10,
            0.50: 10,
            1.00: 10,
            5.00: 10,
            10.00: 10,
            20.00: 10
        }

        this.setState({
            displayText: 0,
            prompt: "Purchase Price:", 
            enteringPurchasePrice: true,
            enteringPaymentPrice: false,
            showChange: false,
            change: []
        })
    }

    // handle clicking of register character buttons
    handleClick(event) {
        // retrieve the number pressed from the click event
        let eventChar = event.nativeEvent.path[0].firstChild.data

        // preprocess string before updating state
        let newText = this.parseDisplayText(this.state.displayText, eventChar)

        this.setState({ displayText: newText });
    }

    // handle clicking of the enter button
    handleEnter() {
        // if the purchase price flag is true
        // and enter was clicked, store the current display and prompt for payment amount
        if (this.state.enteringPurchasePrice) {
            this.purchase = this.state.displayText;
            this.setState({
                displayText: 0,
                prompt: "Payment Amount:",
                enteringPurchasePrice: !this.state.enteringPurchasePrice,
                enteringPaymentPrice: !this.state.enteringPaymentPrice
            })
        // if the payment price flag is true
        // and enter was clicked, store the current display and call CashRegister API for change amount
        } else if (this.state.enteringPaymentPrice) {
            this.payment = this.state.displayText;
            // calculate new display text for change amount HERE
            let changeArray = this.callCashRegisterApi();
            let change = changeArray.reduce((a, b) => a + b, 0)
            this.setState({
                displayText: change,
                prompt: "Change Amount:",
                enteringPurchasePrice: false,
                enteringPaymentPrice: !this.state.enteringPaymentPrice,
                showChange: true,
                change: changeArray
            })
        // otherwise, prompt for purchase price again and reset states
        } else {
            this.setState({
                displayText:0,
                prompt: "Purchase Price:",
                enteringPurchasePrice: true,
                enteringPaymentPrice: false,
                drawerOpen: false,
                showChange: false
            })
        }
    }

    // handler for opening register drawer
    handleOpenDrawer() {
        let drawerOpen = !this.state.drawerOpen;
        this.setState({
            drawerOpen: drawerOpen
        });
    }

    // handler for closing change popup
    handleCloseButton() {
        this.setState({
            showChange:false
        });
    }

    // function for calling the Cash Register API
    callCashRegisterApi() {
        // use AJAX to call the API
        let response = $.ajax({
            url:'https://l6za7byfzc.execute-api.us-east-1.amazonaws.com/api/cashregister/change',
            async: false,
            contentType: "application/json",
            data: JSON.stringify({
                "purchasePrice": this.purchase,
                "paymentAmount": this.payment,
                "billCounts": String(Object.values(this.billCounts)),
                "totalBills": this.totalBills
            }),
            dataType: "json",
            method: "POST"
        });

        // grab and parse the response
        let change = JSON.parse(response.responseJSON).change;
        // update the change drawer
        for (let i=0; i < change.length; i++) {
            let bill = change[i];
            this.billCounts[bill] = this.billCounts[bill] - 1;
        }

        return change;
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
            <div className="container">
                <div className="Change-display">
                    {this.state.showChange && 
                        <div className="Change-panel">
                            <button className="Close-button" onClick={this.handleCloseButton}>×</button>
                            Change:
                            <ChangeList change={this.state.change}/>
                        </div>
                    }
                </div>
                Cash Register Clerk Simulator
                <div className="Cash-Register row">
                    <div className="col-md-6">
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

                    <div className="Register-right col-md-6">
                        <div className="Register-display">
                            <Display amount={this.state.displayText} prompt={this.state.prompt} />
                        </div>
                        <div className="Register-right-buttons">
                            <RegisterButton name="Reset" onClick={this.handleReset}/>
                            <RegisterButton name="Enter" onClick={this.handleEnter} />
                            <RegisterButton name="Open Drawer" onClick={this.handleOpenDrawer}/>
                        </div>
                    </div>
                </div>
                {this.state.drawerOpen  &&
                    <div className="Register-drawer row">
                        <div className="col Register-drawers">Pennies: {this.billCounts[0.01]}</div>
                        <div className="col Register-drawers">Nickels: {this.billCounts[0.05]}</div>
                        <div className="col Register-drawers">Dimes: {this.billCounts[0.10]}</div>
                        <div className="col Register-drawers">Quarters: {this.billCounts[0.25]}</div>
                        <div className="col Register-drawers">Halves: {this.billCounts[0.50]}</div>
                        <div className="col Register-drawers">$1: {this.billCounts[1.00]}</div>
                        <div className="col Register-drawers">$5: {this.billCounts[5.00]}</div>
                        <div className="col Register-drawers">$10: {this.billCounts[10.00]}</div>
                        <div className="col Register-drawers">$20: {this.billCounts[20.00]}</div>
                    </div>
                }
                

                
            </div>
        )
    }
}

export default CashRegister;