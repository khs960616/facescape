import * as Phaser from "phaser";

export class StageSelect extends Phaser.Scene {
  constructor() {
    super({
      key: "StageSelect",
    });
  }
  coin;
  key;
  trampoline;
  preload(): void {
    this.load.image("background", "images/background.png");
    this.load.image("icon:coin", "images/coin_icon.png");
    this.load.image("key", "images/key.png");
    this.load.image("trampoline", "images/Trampoline.png")
  }

  // method to be executed when the scene has been created
  create(): void {
    this.add.image(480, 300, "background");
    const coin = this.add.sprite(100, 100, "icon:coin").setInteractive();
    this.key = this.add.sprite(300, 300, "key").setInteractive();
    this.trampoline = this.add.sprite(500, 300, "trampoline").setInteractive();
    this.input.manager.enabled = true;

    coin.on("pointerdown", () => {
      this.scene.start("Stage01");
    });

    this.key.on("pointerdown", () => {
      this.scene.start("Stage02");
    });

    this.trampoline.on("pointerdown", () => {
      this.scene.start("Stage03");
    });
  }

  update(): void {}
}
