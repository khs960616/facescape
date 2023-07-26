import * as Phaser from "phaser";
import { PreloadAssets } from "./preloadAssets";
import { PlayGame } from "./playGame";

const scaleObject: Phaser.Types.Core.ScaleConfig = {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: "thegame",
  width: 960,
  height: 600,
};

const configObject: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  // backgroundColor: 0x5df4f0,
  scale: scaleObject,
  scene: [PreloadAssets, PlayGame],
};

new Phaser.Game(configObject);
