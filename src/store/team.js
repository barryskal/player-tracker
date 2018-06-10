import { observable, decorate } from "mobx";
import Player from "./player";

class Team {
  static fromString(playerArray, timer) {
    const team = new Team(timer);
    team.players = playerArray.map(p => Player.fromString(p, timer));
    return team;
  }

  players = [];

  constructor(timer) {
    this.timer = timer;
  }

  addPlayer(name) {
    this.players.push(new Player(name, this.timer));
  }

  deletePlayer(id) {
    this.players.splice(id, 1);
  }

  resetTimers() {
    this.players.forEach(p => p.reset());
  }

  /**
   * Turns on or off all active player timers, called when the game is paused
   */
  togglePlayerTimers() {
    this.players.forEach(p => p.updateTimer());
  }

  toString() {
    return this.players.map(p => p.toString());
  }
}

export default decorate(Team, {
  players: observable
});
