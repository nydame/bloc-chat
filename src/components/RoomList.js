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
        this.deleteRoom = this.deleteRoom.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addRoom = this.addRoom.bind(this);
    }

    // UTILITY FNS AND EVENT HANDLERS

    componentDidMount() {
        this.updateRooms();
    }

    updateRooms() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key; // VERY IMPORTANT STEP!!!
            this.setState({ rooms: this.state.rooms.concat(room) });
        });
        this.roomsRef.on('child_removed', snapshot => {
            const deletedRoom = snapshot.val();
            deletedRoom.key = snapshot.key;
            // update rooms
            this.setState({
                rooms: this.state.rooms.filter(
                    room => room.key !== deletedRoom.key
                ),
            });
            // reset active room if deleted room was active
            if (deletedRoom.key === this.props.activeRoom) {
                console.log('resetting active room');
                this.props.resetActiveRoom();
            }
        });
    }

    deleteRoom(ev) {
        console.log(ev.target.dataset.roomid);
        // ask Are you sure? then remove room if confirmed
        window.confirm(
            'Are you sure you want to delete the ' +
                ev.target.dataset.roomname +
                ' room?'
        ) && this.roomsRef.child(ev.target.dataset['roomid']).remove();
    }

    handleInputChange(ev) {
        // update state (local)
        this.setState({ newRoomName: ev.target.value });
    }

    addRoom(ev) {
        // keep submit event from causing page reload
        ev.preventDefault();
        // make sure name has not already in use
        this.roomsRef
            .orderByChild('name')
            .equalTo(this.state.newRoomName)
            .once('value', snapshot => {
                if (snapshot.val()) {
                    window.alert('Sorry, that room name is already in use.');
                    return false;
                } else {
                    // update database (remote) and clear text field (local)
                    this.roomsRef
                        .push()
                        .set({ name: this.state.newRoomName }, err => {
                            if (err) {
                                window.alert(
                                    'Sorry, your action could not be completed due to ' +
                                        err
                                );
                            } else {
                                this.setState({ newRoomName: '' });
                            }
                        });
                }
            });
    }

    render() {
        return (
            <div
                className="room-list"
                style={{
                    backgroundColor: 'greenyellow',
                    color: 'steelblue',
                    flexGrow: 1,
                    padding: 1 + 'em',
                }}
            >
                <div id="rooms">
                    {this.state.rooms.map((room, index) => (
                        <div key={index} className="room">
                            <h2
                                id={room.key}
                                className={
                                    this.props.activeRoom === room.key
                                        ? 'active'
                                        : ''
                                }
                                onClick={ev => {
                                    this.props.updateActiveRoom(ev);
                                }}
                                style={{
                                    cursor:
                                        this.props.activeRoom === room.key
                                            ? 'default'
                                            : 'pointer',
                                    display: 'inline-block',
                                    color:
                                        this.props.activeRoom === room.key
                                            ? 'silver'
                                            : 'currentColor',
                                }}
                            >
                                {room.name}
                            </h2>
                            &nbsp;
                            <span
                                data-roomname={room.name}
                                data-roomid={room.key}
                                onClick={ev => {
                                    this.deleteRoom(ev);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                [x]
                            </span>
                        </div>
                    ))}
                </div>
                <form className="room-form" onSubmit={e => this.addRoom(e)}>
                    <input
                        type="text"
                        value={this.state.newRoomName}
                        onChange={e => this.handleInputChange(e)}
                    />
                    <input type="submit" value="Add a new room" />
                </form>
            </div>
        );
    }
}

export default RoomList;
