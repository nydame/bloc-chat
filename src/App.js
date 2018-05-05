import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyAn5WmlxH-5Hx8GIK5mx9IocKrOn-o3c5Q',
    authDomain: 'bloc-chat-e7558.firebaseapp.com',
    databaseURL: 'https://bloc-chat-e7558.firebaseio.com',
    projectId: 'bloc-chat-e7558',
    storageBucket: 'bloc-chat-e7558.appspot.com',
    messagingSenderId: '224101002202',
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: 0,
            activeRoomName: '',
        };
        this.updateActiveRoom = this.updateActiveRoom.bind(this);
    }

    // UTILITY FNS AND EVENT HANDLERS

    updateActiveRoom(ev) {
        console.log('New active room!');
        console.log(ev.target.id);
        this.setState({
            activeRoom: ev.target.id,
            activeRoomName: ev.target.textContent,
        });
    }

    render() {
        return (
            <div className="App">
                <h1>
                    {this.state.activeRoom
                        ? "You're in the " + this.state.activeRoomName + ' room'
                        : 'Welcome to BlocChat! Choose a room...'}
                </h1>
                <div style={{ display: 'flex' }}>
                    <RoomList
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                        updateActiveRoom={this.updateActiveRoom}
                    />
                    <MessageList
                        firebase={firebase}
                        activeRoom={this.state.activeRoom}
                    />
                </div>
                <div className="User">
                    <User firebase={firebase} />
                </div>
            </div>
        );
    }
}

export default App;
