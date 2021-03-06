import React, { Component } from "react";
import "./Chart.css";
import ChartContainer from "./ChartContainer";
import DateForm from "./DateForm";
import Playlist from "../components/Playlist";
import LoginSignup from "./LoginSignup";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import SaveChart from "../components/SaveChart";
import ReactLoading from "react-loading";

class App extends Component {
  handleOnClick = () => {
    alert("Logging Out");
    localStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <h4>Introducing...</h4>
        <h1>CHARTFINDER</h1>
        <h3>Find the soundtrack to your life</h3>

        {this.props.loggedIn && (
          <div>
            <h2>Welcome back {this.props.user.username}!</h2>
            <button
              className="loginsignup"
              onClick={() => this.handleOnClick()}
            >
              Logout
            </button>
          </div>
        )}

        {this.props.loggedIn ? <Dashboard /> : <LoginSignup />}

        <DateForm />

        {this.props.requesting ? (
          <div>
            <h2>Generating......</h2>
            <div className={"ReactLoading"}>
              <ReactLoading type={"bars"} color={"white"} />
            </div>
          </div>
        ) : (
          <div>
            <hr />
            <ChartContainer />

            {this.props.loggedIn && <SaveChart />}
            <Playlist chart={this.props.chart} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requesting: state.charts.requesting,
    chart: state.charts.chart,
    loggedIn: state.charts.loggedIn,
    user: state.charts.user,
  };
};


export default connect(mapStateToProps)(App);
