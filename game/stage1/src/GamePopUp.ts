// GameOverPopup.js
export class GamePopUp extends Phaser.GameObjects.Container {
  constructor(scene:Phaser.Scene, width:number, height:number, action:Function, title:string, contents:string, buttonText:string, imgPath:string) {
    const x = scene.cameras.main.width / 2;
    const y = scene.cameras.main.height / 2;

    super(scene, x, y);

    const backgroundImage = scene.add.image(0, 0, imgPath).setDisplaySize(width, height);
  
    // 제목 텍스트
    const titleTextConfig = { fontFamily: 'defaultFont_bold', color: '#FFF', fontSize: '32px' };
    const titleText = scene.add.text(0, 0 - (height / 2) + 40, title, titleTextConfig).setOrigin(0.5);


    // 내용 텍스트
    const popupTextConfig = { fontFamily: 'defaultFont', color: '#FFF', fontSize: '24px' };
    const popupText = scene.add.text(0, 0, contents, popupTextConfig).setOrigin(0.5);


    
    // 버튼
    const buttonConfig = { fontFamily: 'defaultFont', color: '#FFF', fontSize: '24px' };
    const button = scene.add.text(0, 0 + (height / 2) - 40, buttonText, buttonConfig).setOrigin(0.5);
    button.setInteractive().on('pointerdown', () => {
      this.destroy();
      action();
    }, scene);

    scene.add.existing(this);
    this.add([backgroundImage,  titleText, popupText, button]);
   // this.add([overlay, popupImage, popupBorder, titleText, popupText, button]);
  }
}
