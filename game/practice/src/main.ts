import * as Phaser from "phaser";
import { Stage01 } from "./stage01";
import { StageSelect } from "./stageSelect";
const scaleObject: Phaser.Types.Core.ScaleConfig = {
  // mode: Phaser.Scale.FIT,
  // autoCenter: Phaser.Scale.CENTER_BOTH,
  // parent: "game",
  width: 960,
  height: 600,
};

const configObject: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  // backgroundColor: 0x5df4f0,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: true,
      checkCollision: { up: true, down: true, left: true, right: true },
      // fps: 200,
    },
  },
  // antialias: false,
  // roundPixels: true,
  // pixelArt: false,
  scale: scaleObject,
  scene: [StageSelect, Stage01],
};

new Phaser.Game(configObject);
