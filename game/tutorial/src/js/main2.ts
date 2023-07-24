import Phaser from "phaser";
import { config } from "process";

const scaleObject: Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: "thegame",
  width: 540,
  height: 540,
};

const configObject: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0x5df4f0,
  scale: scaleObject,
  scene: [],
};

new Phaser.Game(configObject);
