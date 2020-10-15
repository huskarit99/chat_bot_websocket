var React = require('react');
import './ChatBox.css';

var io = require('socket.io-client');
var queryString = require('query-string');
var Message = require('../Message/Message');
var { Redirect } = require('react-router-dom');
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

const ENDPOINT = '127.0.0.1:5000';

let socket;

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
      value: '',
      newMessage: '',
      auth: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMess = this.handleChangeMess.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value){
      var info = {name : this.state.name, message : this.state.value, room : this.state.room};
      socket.emit('sendMessage', info, (error) => {
        this.setState({
          value : ''
        });
        if (error) {
          alert(error);
        }
      });
    }
  }

  handleChangeMess(event) {
    this.setState({
      value: event.target.value
    });
  }

  componentWillMount() {
    socket = io(ENDPOINT);
    const { name, room } = queryString.parse(this.props.location.search);
    this.setState({
      name: name,
      room: room
    });
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
        this.setState({
          auth: false
        });
      }
    });
  }

  componentDidMount() {
    socket.on('new', (info) => {
      this.setState({
        newMessage: info
      });
    });
    socket.on('responeMessage', (info) => {
      this.setState({
        newMessage: info
      });
    });
  }

  componentDidUpdate() {
    if (this.state.newMessage != ''){
      this.setState({
        newMessage : ''
      });
    }
  }

  render() {
    if (!this.state.auth)
      return (
        <Redirect to='/' />
      );
    else {
      return (
        <div className="outerContainer">
          <div className="container">
            <div className="infoBar">
              <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon" />
                <h3>Hi {this.state.name}. This is room #{this.state.room}</h3>
              </div>
              <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close icon" /></a>
              </div>
            </div>
            <Message message={this.state.newMessage} name={this.state.name} />
            <form className="form">
              <input
                type="text"
                className="input"
                value={this.state.value}
                placeholder="Type a message..."
                onChange={this.handleChangeMess}
                onKeyPress={event => event.key === 'Enter' ? this.handleSubmit : null}
              />
              <button type="submit" className="sendButton" onClick={this.handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default ChatBox;