import React, { Component } from "react";
import "./App.css";
import PlayersTable from "./components/players-table";
import TimeDisplay from "./components/time-display";
import { format } from "./components/time-display";
import ConfirmModal from "./components/confirm-modal";
import cx from "classnames";
import { observer } from "mobx-react";

const GAME_SECONDS = 40 * 60;
const PLAYERS_IN_GAME = 7;

/*
AppProps {
  timerStore,
  playerStore
}
*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editMode: false
    };
  }

  toggleEditMode = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, { editMode: !prevState.editMode })
    );
  };

  resetTimer = () => {
    this.props.timerStore.resetTimer();
    this.props.teamStore.resetTimers();
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        showModal: !prevState.showModal
      })
    );
  };

  getTarget = () => {
    const numPlayers = this.props.teamStore.players.length;
    let benchPlayers = numPlayers - PLAYERS_IN_GAME;
    if (benchPlayers < 0) {
      benchPlayers = 0;
    }
    let benchTime = benchPlayers * GAME_SECONDS;
    return Math.floor(GAME_SECONDS - benchTime / numPlayers);
  };

  toggleGameTimer = () => {
    this.props.timerStore.toggleTimer();
    this.props.teamStore.togglePlayerTimers();
  };

  render() {
    return (
      <div className="App">
        <ConfirmModal
          message="Are you sure you want to reset the timer?"
          confirm={this.resetTimer}
          cancel={this.toggleModal}
          show={this.state.showModal}
        />
        <header className="header">Player Tracker</header>
        <div className="container">
          <div className="controls">
            <div>
              <button
                className={cx("button", "editButton")}
                onClick={this.toggleEditMode}
              >
                {this.state.editMode ? "Done Editing" : "Edit Players"}
              </button>
            </div>
            <div>
              <button
                className={cx("button", "startButton")}
                onClick={this.toggleGameTimer}
              >
                {`${this.props.timerStore.active ? "Stop" : "Start"} Timer`}
              </button>
            </div>
          </div>
          <div
            className={cx("gameTimer", {
              hidden: !this.props.timerStore.started
            })}
          >
            <div>Game Time:</div>
            <TimeDisplay
              showColor={false}
              seconds={this.props.timerStore.gameSeconds}
            />
            <div>(Target: {format(this.getTarget())})</div>
          </div>
          <PlayersTable
            teamStore={this.props.teamStore}
            editMode={this.state.editMode}
          />
          <button onClick={this.toggleModal} className="resetButton">
            Reset Timer
          </button>
        </div>
      </div>
    );
  }
}

export default observer(App);
