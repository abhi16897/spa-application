import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            name: '',
            location: '',
            updateid: 0,
            update:''
        }
        this.getName = this.getName.bind(this)
        this.getLocation = this.getLocation.bind(this)
        this.receiveIdAndDelete = this.receiveIdAndDelete.bind(this)
        this.receiveIdAndUpdate = this.receiveIdAndUpdate.bind(this)
        
        // this.deleteFriendWithId=this.deleteFriendWithId.bind(this)
    }
    componentWillMount() {
        this.getFriends()
    }

    getFriends() {
        axios.get('http://localhost:3000/data')
            .then((response) => {
                console.log(response);
                console.log(response.data);
                this.setState({ friends: response.data })
            }, (error) => {
                console.log(error);
            })
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
    displayFriends = function () {
        return this.state.friends.map((friend) => {
            return (
                <tr key={friend.id}>
                    <td>{friend.id}</td>
                    <td>{friend.name}</td>
                    <td>{friend.location}</td>
                    <td>
                        <button onClick={()=>this.receiveIdAndUpdate(friend.id)} ><Link to={"/update/"+friend.id}>Update</Link></button>
                    </td>
                    <td>
                        <button onClick={()=>this.receiveIdAndDelete(friend.id)} >Delete</button>
                    </td>
                </tr>
            )
        })
    }

    // deleteFriendWithId = function () {
    //     console.log("Delete friend with ID: " + this.props.id);
    //     this.deleteWithId(this.props.id)
    // }
    
    receiveIdAndUpdate=function (e){
        this.state.update=e;
        console.log(e,this.state.update);
    }       
    
    receiveIdAndDelete = function (e) {
        console.log("I am called from Friend (child) component!");
        console.log("I am in Friends component!");
        console.log("Deleting with ID: " + e);

        axios.delete('http://localhost:3000/data/' + e)
            .then(res => {
                console.log("Deleted with Id: " + e);
                //udpate this.state.friends with new response after delete!
                this.getFriends()
            }, err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th colSpan='2'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayFriends()}
                    </tbody>
                </table>

                <br />
            </div>
        );
    }

}

export default Display;