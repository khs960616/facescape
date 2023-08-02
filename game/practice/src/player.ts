import * as Phaser from "phaser";
import { cursorTo } from "readline";
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    collider?: any
  ) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.physics.add.existing(this);
    this.setTexture(texture);
    this.setCollideWorldBounds(true);
    this.scene.physics.add.collider(this, collider);
  }

  update(): void {
    const { left, right, up } = this.scene.input.keyboard.createCursorKeys();
    if (left.isDown) {
      this.setVelocityX(-160);
    } else if (right.isDown) {
      this.setVelocityX(160);
    } else {
      this.setVelocityX(0);
    }

    if (up.isDown && this.body.blocked.down) {
      console.log("jump!");
      this.setVelocityY(-330);
    }
  }
}
