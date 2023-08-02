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

    this.load.atlas('slice', 'images/slice.png', 'images/slice.json');

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

    this.player = this.add.existing(new Player(this, 50, 450, "player"));
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    //collision setting
    this.platformLayer.setCollision(1);
    this.physics.add.collider(this.player, this.platformLayer);

    this.platformLayer.setCollisionByExclusion([-1], true);

    // 400 200   286 198
    const bar1 = this.add.nineslice(this.game.canvas.width/2, this.game.canvas.height/6, 'slice', 'ButtonOrange').setScrollFactor(0);
    const fill1 = this.add.nineslice(this.game.canvas.width/2 - 114, this.game.canvas.height/6 - 2, 'slice', 'ButtonOrangeFill2', 13, 39, 6, 6).setScrollFactor(0);
    fill1.setOrigin(0, 0.5);

    this.tweens.add({
      targets: fill1,
      width: 228,
      duration: 20000,
      ease: 'sine.out',
      yoyo: false,
      repeat: -1,
  });


  }




  update(): void {
    const isColliding = this.physics.world.collide(
      this.player,
      this.platformLayer
    );

    const { left, right, up } = this.input.keyboard.createCursorKeys();

    if (left.isDown) {
      this.player.setVelocityX(-160);
    } else if (right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (up.isDown && this.player.body.blocked.down) {
      console.log("jump!");
      this.player.setVelocityY(-330);
    }
  }
}
