import React, { Component } from "react";
import "./App.css";
import PlayersTable from "./components/players-table";
import TimeDisplay from "./components/time-display";
import { format } from "./components/time-display";
import ConfirmModal from "./components/confirm-modal";
import cx from "classnames";
import timeRanker from "./time-ranker";

const STORAGE_KEY = "players";
const GAME_SECONDS = 40 * 60;
const PLAYERS_IN_GAME = 7;

const loadFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {};
  }
  // Fix the dates to be date objects
  const state = JSON.parse(stored);
  state.now = new Date(state.now);
  state.timeStart = new Date(state.timeStart);
  state.players = state.players.map(p => {
    p.timeStart = new Date(p.timeStart);
    return p;
  });
  return state;
};

const saveState = state => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      now: new Date(),
      started: false,
      active: false,
      timeStart: 0,
      totalTime: 0,
      updating: false,
      showModal: false,
      editMode: false
    };
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
    this.setState(loadFromStorage());
  }

  secondsBetween = start => {
    return Math.floor((this.state.now.getTime() - start.getTime()) / 1000);
  };

  tick = (stop = false) => {
    // Don't update the time if in the middle of updating something else
    if (!this.state.updating) {
      this.setState({ now: new Date(), updating: stop });
    }
  };

  pauseGame = () => {
    this.tick(true);
    this.setState(prevState => {
      const totalTime =
        prevState.totalTime + this.secondsBetween(prevState.timeStart);
      const players = prevState.players.map(player => {
        player.totalTime += player.active
          ? this.secondsBetween(player.timeStart)
          : 0;
        return player;
      });
      return saveState(
        Object.assign({}, prevState, {
          active: false,
          totalTime,
          players,
          updating: false
        })
      );
    });
  };

  toggleGameTimer = () => {
    this.tick(true);

    this.setState(prevState => {
      const active = !prevState.active;
      const players = prevState.players.map(p => {
        if (active && p.active) {
          p.timeStart = prevState.now;
        } else if (!active && p.active) {
          p.totalTime += this.secondsBetween(p.timeStart);
        }
        return p;
      });

      const totalTime =
        prevState.totalTime +
        (active ? 0 : this.secondsBetween(prevState.timeStart));

      return saveState(
        Object.assign({}, prevState, {
          started: true,
          active,
          timeStart: prevState.now,
          totalTime,
          players,
          updating: false
        })
      );
    });
  };

  updatePlayerTimer = player => {
    const activeGame = this.state.started && this.state.active;
    if (activeGame && player.active) {
      player.timeStart = this.state.now;
    } else if (activeGame && !player.active) {
      player.totalTime += this.secondsBetween(player.timeStart);
    }
    return player;
  };

  selectPlayer = id => {
    this.tick(true);
    this.setState(prevState => {
      const players = prevState.players;
      players[id].active = !players[id].active;
      players[id] = this.updatePlayerTimer(players[id]);

      return saveState(
        Object.assign({}, prevState, {
          players,
          updating: false
        })
      );
    });
  };

  toggleEditMode = () => {
    this.setState(prevState =>
      saveState(Object.assign({}, prevState, { editMode: !prevState.editMode }))
    );
  };

  updatePlayer = (key, name) => {
    this.tick(true);
    this.setState(prevState => {
      prevState.players[key].name = name;
      prevState.updating = false;
      prevState.editMode = false;
      return saveState(prevState);
    });
  };

  deletePlayer = key => {
    this.tick(true);
    this.setState(prevState => {
      prevState.players.splice(key, 1);
      prevState.updating = false;
      return saveState(prevState);
    });
  };

  addPlayer = name => {
    this.setState(prevState => {
      const timeStart = this.state.active ? 0 : new Date();
      prevState.players.push({ name, timeStart, totalTime: 0, active: false });
      return saveState(prevState);
    });
  };

  mapPlayers = () => {
    const players = this.state.players.map((player, id) => {
      const seconds =
        !player.active || !this.state.active
          ? player.totalTime
          : this.secondsBetween(player.timeStart) + player.totalTime;
      return {
        id,
        name: player.name,
        active: player.active,
        seconds
      };
    });

    return timeRanker(players);
  };

  resetTimer = () => {
    this.setState(prevState => {
      const players = prevState.players.map(p =>
        Object.assign({}, p, { totalTime: 0 })
      );

      return saveState(
        Object.assign({}, prevState, {
          players,
          started: false,
          active: false,
          timeStart: 0,
          totalTime: 0,
          updating: false,
          showModal: false
        })
      );
    });
  };

  getElapsed = () => {
    return (
      this.state.totalTime +
      (this.state.active ? this.secondsBetween(this.state.timeStart) : 0)
    );
  };

  toggleModal = () => {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        showModal: !prevState.showModal
      })
    );
  };

  getTarget = () => {
    const numPlayers = this.state.players.length;
    let benchPlayers = numPlayers - PLAYERS_IN_GAME;
    if (benchPlayers < 0) {
      benchPlayers = 0;
    }
    let benchTime = benchPlayers * GAME_SECONDS;
    return Math.floor(GAME_SECONDS - benchTime / numPlayers);
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
                {`${this.state.active ? "Stop" : "Start"} Timer`}
              </button>
            </div>
          </div>
          <div
            className={cx("gameTimer", {
              hidden: !this.state.started
            })}
          >
            <div>Game Time:</div>
            <TimeDisplay showColor={false} seconds={this.getElapsed()} />
            <div>(Target: {format(this.getTarget())})</div>
          </div>
          <PlayersTable
            players={this.mapPlayers()}
            addPlayer={this.addPlayer}
            selectPlayer={this.selectPlayer}
            editMode={this.state.editMode}
            deletePlayer={this.deletePlayer}
            updatePlayer={this.updatePlayer}
          />
          <button onClick={this.toggleModal} className="resetButton">
            Reset Timer
          </button>
        </div>
      </div>
    );
  }
}

export default App;
