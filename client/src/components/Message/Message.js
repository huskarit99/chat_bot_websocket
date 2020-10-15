import ReactEmoji from 'react-emoji';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Message.css';

var React = require('react');

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidUpdate() {
    if (this.props.message) {
      this.state.messages.push(this.props.message);
    }
  }

  identify(message, i) {
    if (message.name === this.props.name) {
      return (
        <div className="messageContainer justifyEnd" key={i}>
          <p className="sentText pr-10">{message.name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="messageContainer justifyStart" key={i}>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
          </div>
          <p className="sentText pl-10 ">{message.name}</p>
        </div>
      );

    }
  }

  render() {
    return (
      <ScrollToBottom className="messages">
        {this.state.messages.map((message, i) => this.identify(message, i))}
      </ScrollToBottom>
    );
  }
}

module.exports = Message;
// export default Message;
//  using when import ... from ...