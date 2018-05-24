import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import TimeDisplay from "../components/time-display";
import PlayerRow from "../components/player-row";
import PlayersTable from "../components/players-table";
import ConfirmModal from "../components/confirm-modal";
import App from "../App";

const players = [
  {
    name: "Barry",
    seconds: 600,
    rank: 1
  },
  {
    name: "Dean",
    seconds: 540,
    rank: 0.5
  },
  {
    name: "Marc",
    seconds: 300,
    rank: 0
  }
];

storiesOf("Player App", module)
  .add("time display", () => (
    <TimeDisplay seconds={number("Total seconds", 600)} rank={0} />
  ))
  .add("player row", () => <PlayerRow name="Barry" seconds={600} rank={0} />)
  .add("players table", () => <PlayersTable players={players} />)
  .add("App", () => <App />)
  .add("Confirm Modal", () => (
    <ConfirmModal message="Are you sure you want to reset the timer?" />
  ));
