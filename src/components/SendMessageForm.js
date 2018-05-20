// const SendMessageForm = info => {
//     console.log(info);
//     const firebase = info.firebase;
//     const user = info.user ? info.user : {};
//     console.log(firebase);
//     console.log(user);
//     return (
//         <form>
//             <input type="text" />
//             <input type="submit" />
//         </form>
//     );
// };

import React, { Component } from 'react';

class SendMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessageText: '',
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        // update state (local)
        this.setState({ newMessageText: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        // update database (remote)
        this.messagesRef.push().set({
            room: this.props.activeRoom,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            text: this.state.newMessageText,
            username: this.props.user.displayName,
        });
    }

    render() {
        const firebase = this.props.firebase;
        const user = this.props.user ? this.props.user : {};
        return (
            <form
                className="send-message"
                onSubmit={ev => this.handleSubmit(ev)}
            >
                <input
                    type="text"
                    value={this.state.newMessageText}
                    onChange={e => this.handleChange(e)}
                />
                <input type="submit" value="Send my comment" />
            </form>
        );
    }
}

export default SendMessageForm;
