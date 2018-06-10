import { STORAGE_KEY_V0 } from "./state-saver";

function migrateOldState(timerStore, teamStore) {
  const v0 = localStorage.getItem(STORAGE_KEY_V0);
  if (v0) {
    const parsed = JSON.parse(v0);
    parsed.players.forEach(p => {
      teamStore.addPlayer(p.name);
    });
    localStorage.removeItem(STORAGE_KEY_V0);
  }
}

export default migrateOldState;
