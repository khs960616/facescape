"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = require("phaser");
var scaleObject = {
    mode: phaser_1.default.Scale.FIT,
    autoCenter: phaser_1.default.Scale.CENTER_BOTH,
    parent: "thegame",
    width: 540,
    height: 540,
};
var configObject = {
    type: phaser_1.default.AUTO,
    backgroundColor: 0x5df4f0,
    scale: scaleObject,
    scene: [],
};
new phaser_1.default.Game(configObject);
