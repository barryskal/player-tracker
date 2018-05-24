import React from "react";
import "./index.css";
import TimeDisplay from "../time-display";
import cx from "classnames";

const PlayerRow = ({
  id,
  name,
  selectPlayer,
  active,
  editMode = false,
  updatePlayer,
  deletePlayer,
  ...timeDetails
}) => {
  const selectHandler = () => {
    if (!editMode) {
      selectPlayer(id);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      updatePlayer(id, e.target.value);
    }
  };

  return (
    <div
      className={cx("playerRow", { selected: !editMode && active })}
      onClick={selectHandler}
    >
      <div className={"playerName"}>
        {editMode ? (
          <input type="text" onKeyPress={handleKeyPress} defaultValue={name} />
        ) : (
          name
        )}
      </div>
      {editMode ? (
        <button className="deleteButton" onClick={() => deletePlayer(id)}>
          Delete
        </button>
      ) : (
        <TimeDisplay className={"timeDisplay"} {...timeDetails} />
      )}
    </div>
  );
};

export default PlayerRow;
