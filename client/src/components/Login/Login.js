import './Login.css';

const React = require('react');
const { Link } = require('react-router-dom');
var { Redirect } = require('react-router-dom');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: ''
    }
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChangeRoom(event) {
    this.setState({
      room: event.target.value
    })
  }

  handleSubmit() {
    console.log("hahahahah");
    this.props.history.push('/chat?name=' + this.state.name + '&room=' + this.state.room);
  }

  render() {
    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <form>
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              className="joinInput"
              onChange={this.handleChangeName}
            />
            <input
              type="text"
              placeholder="Room"
              value={this.state.room}
              className="joinInput mt-20"
              onChange={this.handleChangeRoom}
            />
            {/* <Link to={`/chat?name=${this.state.name}&room=${thi(''/s.state.room}`}>
            <button className={'button mt-20'} type="submit" onKeyPress={event => event.key == 'Enter' ? true : null}>Sign In</button>
          </Link> */}
            <button
              className={'button mt-20'}
              onClick={this.handleSubmit}
              type="submit"
              onKeyPress={event => event.key === 'Enter' ? this.handleSubmit : null}
            >
              Sign In
          </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;