import * as Phaser from "phaser";
import { Player } from "./player";

export class Stage02 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage02",
    });
  }
  platformLayer: Phaser.Tilemaps.TilemapLayer;
  player: Phaser.Physics.Arcade.Sprite;
  preload(): void {
    this.load.tilemapTiledJSON("map2", "data/map2.json");

    this.add.image(400, 300, "hotdog").setScrollFactor(0);

    this.load.image("background", "images/background.png");
    this.load.image("grass", "images/grassMid.png");
    this.load.spritesheet("player", "images/hero.png", {
      frameWidth: 36,
      frameHeight: 42,
    });
    this.load.spritesheet("icon:key", "images/key_icon.png", {
      frameWidth: 34,
      frameHeight: 30,
    });

    this.load.spritesheet("trafficLight", "images/TrafficLight.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }
  create(): void {
    // this.physics.world.setFPS(120);
    this.add.image(480, 300, "background");
    this.cameras.main.setBounds(0, 0, 1400, 3850);
    this.physics.world.setBounds(0, 0, 1400, 3850);
    const map = this.make.tilemap({
      key: "map2",
      tileWidth: 70,
      tileHeight: 70,
    });

    const grass = map.addTilesetImage("grassMid", "grass");

    this.platformLayer = map.createLayer("platformLayer", [grass]);

    this.player = this.add.existing(
      new Player(this, 50, 450, "player", this.platformLayer)
    );
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    //collision setting
    this.platformLayer.setCollision(1);
    // this.physics.add.collider(this.player, this.platformLayer);

    this.platformLayer.setCollisionByExclusion([-1], true);

    const trafficLight = this.add
      .sprite(
        this.game.canvas.width / 2,
        this.game.canvas.height / 2,
        "trafficLight"
      )
      .setScrollFactor(0);
  }

  update(): void {
    this.player.update();
    const isColliding = this.physics.world.collide(
      this.player,
      this.platformLayer
    );
    console.log(isColliding);

    // const { left, right, up } = this.input.keyboard.createCursorKeys();

    // if (left.isDown) {
    //   this.player.setVelocityX(-160);
    // } else if (right.isDown) {
    //   this.player.setVelocityX(160);
    // } else {
    //   this.player.setVelocityX(0);
    // }

    // if (up.isDown && this.player.body.blocked.down) {
    //   console.log("jump!");
    //   this.player.setVelocityY(-330);
    // }
  }
}
