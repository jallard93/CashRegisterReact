import React from "react";

class RegisterButton extends React.Component{
    constructor(props) {
        super(props);
        this.name = props.name;
        this.onClick = props.onClick;
    }

    render() {
        return (
            <button className="Register-button col" onClick={this.onClick}>
                {this.name}
            </button>
        );
    }
    
}


export default RegisterButton;