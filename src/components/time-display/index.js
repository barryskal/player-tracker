import React from "react";
import "./index.css";
import cx from "classnames";

function convertToDoubleDigit(value) {
  if (value === 0) {
    return "00";
  } else if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

/**
 * Colors the user by rank, 100% should be red, 0% should be green
 */
function getColor(rank) {
  //value from 0 to 1
  var hue = ((1 - rank) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}

export function format(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${convertToDoubleDigit(minutes)}:${convertToDoubleDigit(seconds)}`;
}

const TimeDisplay = ({ seconds, rank = 0, className, showColor = true }) => {
  return (
    <div
      className={cx("timeDisplay", className)}
      style={showColor ? { backgroundColor: getColor(rank) } : {}}
    >
      {format(seconds)}
    </div>
  );
};

export default TimeDisplay;
