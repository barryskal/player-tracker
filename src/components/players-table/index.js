import React from "react";
import "./index.css";
import PlayerRow from "../player-row";
import cx from "classnames";

class PlayersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: true
    };
  }

  showPlayerInput = () => this.setState({ showAdd: false });

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.addPlayer(e.target.value);
      e.target.value = "";
      this.setState({ showAdd: true });
    }
  };

  render() {
    return (
      <div className={"playersTable"}>
        {this.props.players.map(player => (
          <div key={player.id} className={"playerRow"}>
            <PlayerRow
              {...player}
              selectPlayer={this.props.selectPlayer}
              editMode={this.props.editMode}
              updatePlayer={this.props.updatePlayer}
              deletePlayer={this.props.deletePlayer}
            />
          </div>
        ))}
        <div
          className={cx("playerInput", {
            hidden: this.state.showAdd
          })}
        >
          <label>Name:</label>
          <input type="text" onKeyPress={this._handleKeyPress} />
        </div>
        <div
          className={cx("addPlayer", {
            hidden: !this.state.showAdd
          })}
          onClick={this.showPlayerInput}
        >
          <div>+</div>
        </div>
      </div>
    );
  }
}

export default PlayersTable;
