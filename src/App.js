import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
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
    }
    render() {
        return (
            <div className="App">
                <RoomList firebase={firebase} />
            </div>
        );
    }
}

export default App;
