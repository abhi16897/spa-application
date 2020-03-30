import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            name: '',
            location: '',
        }
        this.getName = this.getName.bind(this)
        this.getLocation = this.getLocation.bind(this)
        this.addFriend = this.addFriend.bind(this)
    }

    addFriend = function () {
        if (!(this.state.name === '') && !(this.state.location === '')) {
            var dataJson = {
                "name": this.state.name,
                "location": this.state.location,
            }
            this.setState({ name: '' })
            this.setState({ location: '' })
            axios.post('http://localhost:3000/data', dataJson)
                .then(res => {
                    console.log("Friend Added!");
                    console.log(res);
                }, err => {

                })
        }
    }

    getName = function (e) {
        //e.preventDefault()
        this.setState({ name: e.target.value })
        console.log(this.state.name);
    }

    getLocation = function (e) {
        //e.preventDefault()
        this.setState({ location: e.target.value })
        console.log(this.state.location);
    }

    
    render() {
        return (
            <fieldset>
                <legend>Add Friend</legend>
                    Name: <input type="text"
                    value={this.state.name}
                    onChange={this.getName} />
                <br />
                    Location: <input type="text"
                    value={this.state.location}
                    onChange={this.getLocation} />
                <br />
                <button onClick={this.addFriend}><Link to="/">Add</Link></button>
            </fieldset>
        );
    }
}
export default Add;