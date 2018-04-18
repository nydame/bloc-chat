import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    // UTILITY FNS AND EVENT HANDLERS
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            // WHY DOESN'T PUSH() WORK ON NEXT LINE???
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    render() {
        return (
            <div className="room-list">
                <h1>Welcome!</h1>
                <div id="rooms">
                    {this.state.rooms.map((room, index) => (
                        <h2 key={index}>{room.name}</h2>
                    ))}
                </div>
            </div>
        );
    }
}

export default RoomList;
