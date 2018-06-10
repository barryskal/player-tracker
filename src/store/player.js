import { observable, decorate, computed } from "mobx";
import { secondsBetween, getFields } from "./helpers";

class Player {
  static fromString(value, timer) {
    const parsed = JSON.parse(value);
    parsed.timeStart = new Date(parsed.timeStart);
    const player = new Player(parsed.name, timer);
    return Object.assign(player, parsed);
  }

  constructor(name, timer) {
    this.timer = timer;
    this.name = name;
    this.timeStart = 0;
    this.totalTime = 0;
    this.active = false;
  }

  reset() {
    this.totalTime = 0;
  }

  updateTimer() {
    if (this.timer.active && this.active) {
      this.timeStart = this.timer.now;
    } else if (!this.timer.active && this.active) {
      this.totalTime += secondsBetween(this.timeStart, this.timer.now);
      this.timeStart = 0;
    }
  }

  get seconds() {
    if (this.timer.active && this.active) {
      return this.totalTime + secondsBetween(this.timeStart, this.timer.now);
    } else {
      return this.totalTime;
    }
  }

  toggleActive() {
    if (this.timer.active && this.active) {
      this.totalTime += secondsBetween(this.timeStart, this.timer.now);
      this.timeStart = 0;
    } else if (this.timer.active && !this.active) {
      this.timeStart = this.timer.now;
    }
    this.active = !this.active;
  }

  toString() {
    const fields = getFields(this, "name", "timeStart", "totalTime", "active");
    return JSON.stringify(fields);
  }
}

export default decorate(Player, {
  name: observable,
  active: observable,
  timeStart: observable,
  totalTime: observable,
  seconds: computed
});
