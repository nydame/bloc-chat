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
    }
    render() {
        const firebase = this.props.firebase;
        const user = this.props.user ? this.props.user : {};
        return (
            <form className="send-message">
                <input type="text" />
                <input type="submit" value="Send" />
            </form>
        );
    }
}

export default SendMessageForm;
