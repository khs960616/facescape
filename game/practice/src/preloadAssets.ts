import * as Phaser from "phaser";
export class PreloadAssets extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadAssets",
    });
  }
  preload(): void {
    this.load.tilemapTiledJSON("map1", "data/map1.json");

    this.load.json("level:0", "data/level00.json");
    this.load.image("font:numbers", "images/numbers.png");

    this.load.image("background", "images/background.png");
    this.load.image("ground", "images/ground.png");
    this.load.image("grass:8x1", "images/grass_8x1.png");
    this.load.image("grass:6x1", "images/grass_6x1.png");
    this.load.image("grass:4x1", "images/grass_4x1.png");
    this.load.image("grass:2x1", "images/grass_2x1.png");
    this.load.image("grass", "images/grass_1x1.png");
    this.load.image("invisible-wall", "images/invisible_wall.png");
    this.load.image("icon:coin", "images/coin_icon.png");
    this.load.image("key", "images/key.png");

    this.load.spritesheet("coin", "images/coin_animated.png", {
      frameWidth: 22,
      frameHeight: 22,
    });
    this.load.spritesheet("spider", "images/spider.png", {
      frameWidth: 42,
      frameHeight: 32,
    });
    this.load.spritesheet("player", "images/hero.png", {
      frameWidth: 36,
      frameHeight: 42,
    });
    this.load.spritesheet("door", "images/door.png", {
      frameWidth: 42,
      frameHeight: 66,
    });
    this.load.spritesheet("icon:key", "images/key_icon.png", {
      frameWidth: 34,
      frameHeight: 30,
    });

    this.load.audio("sfx:jump", "audio/jump.wav");
    this.load.audio("sfx:coin", "audio/coin.wav");
    this.load.audio("sfx:stomp", "audio/stomp.wav");
    this.load.audio("sfx:key", "audio/key.wav");
    this.load.audio("sfx:door", "audio/door.wav");
  }
  create(): void {
    this.add.image(480, 300, "background");

    const map = this.make.tilemap({
      key: "map1",
      tileWidth: 32,
      tileHeight: 30,
    });
    map.addTilesetImage("ground", "ground");
    map.addTilesetImage("grass", "grass");
    map.addTilesetImage("door", "door");
    const coins = map.addTilesetImage("coin", "coin");
    console.log(coins);

    map.createLayer("platformLayer", ["ground", "grass"]);
    map.createLayer("doorLayer", "door");
    map.createLayer("coinLayer", "coin");

    // var data = this.cache.json.get("level:0");
    // const platforms: Phaser.GameObjects.Group = this.add.group();
    // data.platforms.forEach((platform) => {
    //   var sprite = platforms.create(platform.x, platform.y, platform.image);

    //   this.input.enable(sprite);
    //   sprite.allowGravity = false;
    //   sprite.immovable = true;
    // });
  }
}
