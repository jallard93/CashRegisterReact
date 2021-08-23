import React from "react";

class ChangeList extends React.Component{
    constructor(props) {
        super(props);
        this.change = this.reduceChange(props.change);
        this.listItems = this.createList();
    }

    // create a list of change items 
    createList() {
        let listItems = [];
        for (let bill in this.change) {
            listItems.push(<li>{bill}: {this.change[bill]}</li>);
        }
        return listItems;
    }

    // reduce array of change values to object with mappings bill->bill counts
    reduceChange(change) {
        var changeObject = {}

        for (let i=0; i < change.length; i++) {
            let key = change[i];
            if (key in changeObject) {
                changeObject[key]++; 
            } else {
                changeObject[key] = 1;
            }
        }
        return changeObject;
    }

    render() {
        return (
            <div>
                <ul>{this.listItems}</ul>
            </div>
        );
    }
}


export default ChangeList;