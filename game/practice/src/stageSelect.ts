import * as Phaser from "phaser";

export class StageSelect extends Phaser.Scene {
  constructor() {
    super({
      key: "StageSelect",
    });
  }
  coin;
  key;
  preload(): void {
    this.load.image("background", "images/background.png");
    this.load.image("icon:coin", "images/coin_icon.png");
    this.load.image("key", "images/key.png");
  }

  // method to be executed when the scene has been created
  create(): void {
    this.add.image(480, 300, "background");
    const coin = this.add.sprite(100, 100, "icon:coin").setInteractive();
    this.key = this.add.sprite(300, 300, "key").setInteractive();
    this.input.manager.enabled = true;

    coin.on("pointerdown", () => {
      this.scene.start("Stage01");
    });

    this.key.on("pointerdown", () => {
      this.scene.start("Stage02");
    });
  }

  update(): void {}
}
