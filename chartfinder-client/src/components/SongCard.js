import React, { Component } from "react";
import Song from "./Song";
import Spotify from "./Spotify";

class SongCard extends Component {
  constructor(props) {
    super();
    this.state = {
      hover: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({
      hover: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hover: false,
    });
  };

  render() {
    return (
      <div
        className="SongCard"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Song
          song={this.props.song}
          key={this.props.song.id}
          year={this.props.year}
          birthday={this.props.birthday}
        />
        {this.state.hover === true && <Spotify song={this.props.song} />}
      </div>
    );
  }
}
export default SongCard;
