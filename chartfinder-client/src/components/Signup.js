import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/signup";

class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleNameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signup(this.state);
  };

  render() {
    return (
      <div>
        <h2>Signup here to save your playlists!</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>Username</label>
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.username}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { signup })(Signup);
