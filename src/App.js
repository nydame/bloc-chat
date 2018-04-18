import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}

export default App;
