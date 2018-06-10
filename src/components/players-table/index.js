import React from "react";
import "./index.css";
import PlayerRow from "../player-row";
import cx from "classnames";
import { observer } from "mobx-react";
import timeRanker from "../../time-ranker";

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
      this.props.teamStore.addPlayer(e.target.value);
      e.target.value = "";
      this.setState({ showAdd: true });
    }
  };

  render() {
    return (
      <div className={"playersTable"}>
        {timeRanker(this.props.teamStore.players).map(
          ({ rank, player }, idx) => (
            <div key={`player-${idx}`} className={"playerRow"}>
              <PlayerRow
                id={idx}
                rank={rank}
                player={player}
                editMode={this.props.editMode}
                deletePlayer={() => this.props.teamStore.deletePlayer(idx)}
              />
            </div>
          )
        )}
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

export default observer(PlayersTable);
