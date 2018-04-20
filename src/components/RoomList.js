import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: '',
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.updateRooms = this.updateRooms.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // UTILITY FNS AND EVENT HANDLERS
    componentDidMount() {
        this.updateRooms();
    }

    updateRooms() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            // WHY DOESN'T push() WORK ON NEXT LINE???
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
    }

    handleChange(ev) {
        // update state (local)
        this.setState({ newRoomName: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        // update database (remote)
        this.roomsRef.push().set({ name: this.state.newRoomName });
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
                <form
                    className="room-form"
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <input
                        type="text"
                        value={this.state.newRoomName}
                        onChange={e => this.handleChange(e)}
                    />
                    <input type="submit" value="Add a new room" />
                </form>
            </div>
        );
    }
}

export default RoomList;
