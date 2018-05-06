import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.updateMessages = this.updateMessages.bind(this);
    }

    // UTILITY FNS AND EVENT HANDLERS

    componentDidMount() {
        this.updateMessages();
    }

    updateMessages() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message) });
        });
    }
    render() {
        return (
            <div
                className="message-list"
                style={{ padding: '1em', flexGrow: 2 }}
            >
                <div id="messages">
                    {this.state.messages
                        .filter(
                            msg => msg.room.toString() === this.props.activeRoom
                        )
                        .map((msg, index) => (
                            <p key={index}>
                                {msg.text} - <em>{msg.username}</em>
                            </p>
                        ))}
                </div>
            </div>
        );
    }
}

export default MessageList;
