// GameOverPopup.js
export class GameOverPopup extends Phaser.GameObjects.Container {
  constructor(scene, width, height, message, action) {
    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    super(scene, x, y);

    // 까맣게 변환
    const overlay = scene.add.rectangle(0, 0, scene.cameras.main.width, scene.cameras.main.height, 0x000000);
    overlay.setAlpha(0.5);

    // 팝업 창
    const popup = scene.add.rectangle(0, 0, width, height, 0xffffff);
    const popupBorder = scene.add.rectangle(0, 0, width, height, 0x000000).setStrokeStyle(2, 0x000000);
    
    // 팝업 텍스트
    const popupTextConfig = { color: '#FFF', fontSize: '32px' };
    const popupText = scene.add.text(0, 0 - 40, message, popupTextConfig).setOrigin(0.5);
    
    // 다시하기 버튼
    const retryButton = scene.add.text(0, 0 + 30, '다시하기', popupTextConfig).setOrigin(0.5);
    retryButton.setInteractive().on('pointerdown', () => {
      this.destroy();
      action();
    }, scene);

    scene.add.existing(this);
    this.add([overlay, popup, popupBorder, popupText, retryButton]);
  }
}
