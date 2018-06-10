import { decorate, observable, action, computed } from "mobx";
import { getFields } from "./helpers";

class Timer {
  static fromString(value) {
    const parsed = JSON.parse(value);
    parsed.timerStarted = new Date(parsed.timerStarted);
    const timer = new Timer();
    return Object.assign(timer, parsed);
  }

  // A date object representing now
  now = new Date();
  // True if the timer is active
  active = false;
  // The total time elapsed in millis
  totalTime = 0;
  // The date at which the timer was last started
  timerStarted = new Date();
  // True if the game has started
  started = false;

  toggleTimer() {
    this.started = true;
    if (this.active) {
      this.totalTime += this.secondsBetween(this.timerStarted);
    } else {
      this.timerStarted = this.now;
    }
    this.active = !this.active;
  }

  get gameSeconds() {
    return (
      this.totalTime +
      (this.active ? this.secondsBetween(this.timerStarted) : 0)
    );
  }

  get activeGame() {
    this.started && this.active;
  }

  resetTimer() {
    this.started = false;
    this.active = false;
    this.timerStarted = 0;
    this.totalTime = 0;
    this.updating = false;
  }

  secondsBetween(start) {
    return start
      ? Math.floor((this.now.getTime() - start.getTime()) / 1000)
      : 0;
  }

  tick = stop => {
    if (!this.updating) {
      console.log("tick");
      this.now = new Date();
      this.updating = stop;
    }
  };

  toString() {
    return JSON.stringify(
      getFields(this, "active", "totalTime", "timerStarted", "started")
    );
  }
}

export default decorate(Timer, {
  now: observable,
  active: observable,
  gameSeconds: computed,
  started: observable
});
