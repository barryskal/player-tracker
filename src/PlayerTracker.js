import React from "react";
import Timer from "./store/timer";
import Team from "./store/team";
import App from "./App";
import { observer } from "mobx-react";
import StateSaver from "./store/state-saver";
import { STORAGE_KEY } from "./store/state-saver";
import migrateOldState from "./store/state_converters";

const stored = localStorage.getItem(STORAGE_KEY);
let timerStore;
let teamStore;
if (!stored) {
  timerStore = new Timer();
  teamStore = new Team(timerStore);
} else {
  const parsed = JSON.parse(stored);
  timerStore = Timer.fromString(parsed.timerStore);
  teamStore = Team.fromString(parsed.teamStore, timerStore);
}

new StateSaver(timerStore, teamStore);
// Convert anyone using old state so that they don't lose their player names
migrateOldState(timerStore, teamStore);

setInterval(timerStore.tick, 1000);

const PlayerTracker = () => (
  <App timerStore={timerStore} teamStore={teamStore} />
);

export default observer(PlayerTracker);
