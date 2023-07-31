import * as Phaser from "phaser";
import { Player } from "./player";

export class PlayGame extends Phaser.Scene {
  constructor() {
    super({
      key: "PlayGame",
    });
  }
  player: Player;
  // method to be executed when the scene has been created
  create(): void {
    // this.player = new Player(this, 10, 10, "player");
  }

  update(): void {}
}
