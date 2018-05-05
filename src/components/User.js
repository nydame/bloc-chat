import React, { Component } from 'react';

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
        const { firebase } = this.props;
        return (
            <div className="user">
                {this.state.loggedInUser ? (
                    <p>Welcome, {this.state.loggedInUser.displayName}!</p>
                ) : (
                    <p>Hello, Guest</p>
                )}
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
            </div>
        );
    }
}

export default User;
