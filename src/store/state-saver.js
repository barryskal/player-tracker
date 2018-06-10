import { autorun } from "mobx";

export const STORAGE_KEY_V0 = "players";
export const STORAGE_KEY = "players_v1";

class StateSaver {
  constructor(timerStore, teamStore) {
    this.timerStore = timerStore;
    this.teamStore = teamStore;
    autorun(this.saveState);
  }

  saveState = () => {
    const stored = {};
    stored.timerStore = this.timerStore.toString();
    stored.teamStore = this.teamStore.players.map(p => p.toString());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  };
}

export default StateSaver;
