import React from "react"

class Display extends React.Component {

    render() {
        return (
            <div>
                <form>
                    <label>
                        {this.props.prompt} 
                        <input type="text" value={this.props.amount}/>
                    </label>
                </form>
            </div>
        )
    }
}

export default Display;