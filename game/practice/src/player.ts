import * as Phaser from "phaser";
export class Player extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      (scene.game.config.width as number) / 2,
      (scene.game.config.height as number) / 2,
      "player"
    );
    scene.add.existing(this);
  }

  move(direction): void {
    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;

    // update image flipping & animations
    if (this.body.velocity.x < 0) {
      this.scaleX = -1;
    } else if (this.body.velocity.x > 0) {
      this.scaleX = 1;
    }
  }

  jump(): boolean {
    const JUMP_SPEED = 600;
    let canJump = true;

    if (canJump) {
      this.body.velocity.y = -JUMP_SPEED;
    }

    return canJump;
  }
}
