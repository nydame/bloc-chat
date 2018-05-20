import React, { Component } from 'react';
import SendMessageForm from './SendMessageForm';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    handleLogIn(ev) {
        this.props.firebase
            .auth()
            .signInWithPopup(new this.props.firebase.auth.GoogleAuthProvider())
            .then(result => {
                console.log(result.user.displayName);
                this.setState({ loggedInUser: result.user });
            })
            .catch(err => {
                alert('Houston, we have a problem: ' + err);
            });
    }
    handleLogOut(ev) {
        this.props.firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('You have logged out');
                this.setState({ loggedInUser: null });
            })
            .catch(err => {
                alert('We were unable to sign you out.');
            });
    }
    render() {
        const { firebase, activeRoom } = this.props;
        const username = this.state.loggedInUser
            ? this.state.loggedInUser.displayName
            : 'Guest';
        return (
            <div className="user">
                <p className="user-greeting">Hello, {username}!</p>
                {this.state.loggedInUser ? (
                    <button onClick={ev => this.handleLogOut(ev)}>
                        Log out
                    </button>
                ) : (
                    <button
                        onClick={ev => {
                            this.handleLogIn(ev);
                        }}
                    >
                        Log in
                    </button>
                )}
                {this.state.loggedInUser && this.props.activeRoom ? (
                    <SendMessageForm
                        activeRoom={this.props.activeRoom}
                        user={this.state.loggedInUser}
                        firebase={firebase}
                    />
                ) : (
                    <p>
                        {this.state.loggedInUser ? '' : 'Log in. '}
                        {this.props.activeRoom ? '' : 'Choose a room. '}
                        {this.state.loggedInUser && this.props.activeRoom
                            ? 'Welcome to the conversation!'
                            : 'Then join in the conversation!'}
                    </p>
                )}
            </div>
        );
    }
}

export default User;
