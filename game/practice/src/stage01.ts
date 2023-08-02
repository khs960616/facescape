import * as Phaser from "phaser";
import { Player } from "./player";
import { GameOverPopup } from "./GameOverPopUp";

//====== wall setting ==============
const WALL_START_X = 100;
const WALL_START_Y = 510;
const WALL_GAP = 55;
const WALL_Y_OFFSET = 5; // Positioned slightly above the wall below it

export class Stage01 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage01",
    });
  }
  platformLayer: Phaser.Tilemaps.TilemapLayer;
  player: Phaser.Physics.Arcade.Sprite;
  private walls: Phaser.Physics.Arcade.Group;

  private cannon!: Phaser.Physics.Arcade.Sprite;
  private cannonBalls!: Phaser.Physics.Arcade.Group;
  private fireCount!: number;
  preload(): void {
    this.load.tilemapTiledJSON("map1", "data/map1.json");

    this.load.image("background", "images/background.png");
    this.load.image("grass", "images/grass_1x1.png");
    this.load.image("icon:coin", "images/coin_icon.png");
    this.load.image("key", "images/key.png");

    this.load.image("cannonBall", "images/CannonBall.png");
    this.load.image("wall", "images/Wall.png");

    this.load.spritesheet("cannon", "images/Cannon.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // this.load.spritesheet("coin", "images/coin_animated.png", {
    //   frameWidth: 22,
    //   frameHeight: 22,
    // });
    // this.load.spritesheet("spider", "images/spider.png", {
    //   frameWidth: 42,
    //   frameHeight: 32,
    // });
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

    // this.load.audio("sfx:jump", "audio/jump.wav");
    // this.load.audio("sfx:coin", "audio/coin.wav");
    // this.load.audio("sfx:stomp", "audio/stomp.wav");
    // this.load.audio("sfx:key", "audio/key.wav");
    // this.load.audio("sfx:door", "audio/door.wav");
  }
  create(): void {
    // this.physics.world.setFPS(120);
    this.add.image(480, 300, "background");
    const map = this.make.tilemap({
      key: "map1",
      tileWidth: 32,
      tileHeight: 30,
    });

    // const ground = map.addTilesetImage("ground", "ground");
    const grass = map.addTilesetImage("grass", "grass");
    const door = map.addTilesetImage("door", "door");

    this.platformLayer = map.createLayer("platformLayer", [grass]);
    map.createLayer("doorLayer", "door");

    this.player = this.add.existing(new Player(this, 50, 450, "player"));

    //collision setting
    this.platformLayer.setCollision(2);
    this.physics.add.collider(this.player, this.platformLayer);
    this.createSubObject();

    this.physics.add.collider(this.walls, this.platformLayer);
    this.platformLayer.setCollisionByExclusion([-1], true);
  }

  update(): void {
    const isColliding = this.physics.world.collide(
      this.player,
      this.platformLayer
    );
    console.log(isColliding);

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

  createSubObject() {
    this.cannon = this.physics.add.sprite(740, 510, "cannon", 0);
    this.cannon.flipX = true;
    (this.cannon.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.cannon.body as Phaser.Physics.Arcade.Body).setImmovable(true);

    this.cannonBalls = this.physics.add.group();
    this.time.addEvent({
      //delay:  Phaser.Math.Between(5000, 9000),
      delay: Phaser.Math.Between(1000, 1000),
      callback: this.addCannonBall,
      callbackScope: this,
      loop: true,
    });
    this.fireCount = 0;

    this.walls = this.physics.add.group();
    this.addWall();

    this.walls;

    this.physics.add.collider(this.walls, this.walls);
    this.physics.add.collider(
      this.cannonBalls,
      this.walls,
      (cannonBalls, walls) => {
        cannonBalls.destroy(), walls.destroy();
      },
      undefined,
      this
    );

    // this.key = this.physics.add.sprite(50, 510, "key", 0).setScale(0.1);
    // this.physics.add.collider(this.key, this.ground);
  }

  addCannonBall() {
    const cannonBall = this.physics.add.sprite(720, 570, "cannonBall");
    this.cannonBalls.add(cannonBall);
    cannonBall.body.allowGravity = false; // 중력 영향 안 받음
    cannonBall.setVelocityX(-600); // 포탄의 X축 속도 설정

    // 충돌
    this.physics.add.collider(
      this.player,
      this.cannonBalls,
      this.gameOver,
      undefined,
      this
    );
  }

  addWall() {
    for (let i = 0; i < 3; i++) {
      const positionY = WALL_START_Y - WALL_GAP * i + WALL_Y_OFFSET * i;
      const wall = this.physics.add
        .sprite(WALL_START_X, positionY, "wall")
        .setScale(0.05)
        .setImmovable(true);
      wall.body.allowGravity = true;

      this.physics.add.collider(this.player, wall, () => {
        // wall.body.allowDrag = false;
        wall.body.immovable = true;
        wall.body.moves = false;
      });

      this.walls.add(wall);
    }
  }

  gameOver() {
    this.physics.pause(); // 게임 일시 중지

    new GameOverPopup(this, 400, 300, "game over", () => {
      this.scene.restart(); // 게임 재시작
    }).once("destroy", () => {});
  }
}
