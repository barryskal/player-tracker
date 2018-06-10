import React from "react";
import "./index.css";
import TimeDisplay from "../time-display";
import cx from "classnames";
import { observer } from "mobx-react";

const PlayerRow = ({ player, editMode = false, deletePlayer, rank }) => {
  const selectHandler = () => {
    if (!editMode) {
      player.toggleActive();
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      player.name = e.target.value;
    }
  };

  return (
    <div
      className={cx("playerRow", { selected: !editMode && player.active })}
      onClick={selectHandler}
    >
      <div className={"playerName"}>
        {editMode ? (
          <input
            type="text"
            onKeyPress={handleKeyPress}
            defaultValue={player.name}
          />
        ) : (
          player.name
        )}
      </div>
      {editMode ? (
        <button className="deleteButton" onClick={deletePlayer}>
          Delete
        </button>
      ) : (
        <TimeDisplay
          className={"timeDisplay"}
          seconds={player.seconds}
          rank={rank}
        />
      )}
    </div>
  );
};

export default observer(PlayerRow);
