import * as Phaser from "phaser";
import { Player } from "./player";

export class Stage03 extends Phaser.Scene {
  constructor() {
    super({
      key: "Stage03",
    });
  }

  platformLayer: Phaser.Tilemaps.TilemapLayer;
  player: Phaser.Physics.Arcade.Sprite;
  private trafficLight!: Phaser.GameObjects.Sprite;
  private trampoline!: Phaser.Physics.Arcade.Sprite;
  private trampolineJumpSound!: Phaser.Sound.BaseSound;

    // 신호등 판정 변수
  private trafficLightState: string = 'green';
  private prevPlayerX: number = 0;
  private prevPlayerY: number = 0;

  preload(): void {
    this.load.tilemapTiledJSON("map3", "data/map3.json");
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

    this.load.spritesheet('trafficLight', 'images/traffic_light.png', { 
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.image("trampoline", "images/trampoline.png");
	this.load.audio('trampolineJumpSound', 'audio/trampoline.wav');


  }



  create(): void {
    // this.physics.world.setFPS(120);
    this.add.image(480, 300, "background");
    this.cameras.main.setBounds(0, 0, 1400, 3850);
    this.physics.world.setBounds(0, 0, 1400, 3850);
    const map = this.make.tilemap({
      key: "map3",
      tileWidth: 70,
      tileHeight: 70,
    });

    const grass = map.addTilesetImage("grassMid", "grass");
    this.platformLayer = map.createLayer("platformLayer", [grass]);

    this.player = this.add.existing(new Player(this, 50, 450, "player"));
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.trafficLight = this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/5, 'traffic_light').setScrollFactor(0);

    //collision setting
    this.platformLayer.setCollision(1);
    this.physics.add.collider(this.player, this.platformLayer);
    this.platformLayer.setCollisionByExclusion([-1], true);
    
    // 트램펄린 충돌
    const trampolinesPositions = [
        { x: 400, y: 620 },
        { x: 600, y: 620 },
        { x: 800, y: 620 },
      ];
    
      for (const position of trampolinesPositions) {
        const trampoline = this.physics.add.sprite(position.x, position.y, 'trampoline').setScale(0.3);
    
        (trampoline.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        (trampoline.body as Phaser.Physics.Arcade.Body).setImmovable(true);

        this.trampolineJumpSound = this.sound.add('trampolineJumpSound');
        this.physics.add.collider(this.player, trampoline, this.jumpTrampoline, null, this);
      }

    // 신호등 시간 설정 (/1000 = 초)
    const GREEN_DELAY = 3000;
    const YELLOW_DELAY = 1000;
    const RED_DELAY = 2000;

    // 맵 서브 애니메이션 생성
    const trafficLightFrames = this.anims.generateFrameNumbers('trafficLight', { start: 0, end: 2 });
    const trafficLightFrameConfig = {
        key: 'trafficLight_anim',
        frames: trafficLightFrames,
        frameRate: 1,
        repeat: -1
    };

    // 초록-노랑-빨강 순서대로 지연 시간 배분
    const delays = [GREEN_DELAY, YELLOW_DELAY, RED_DELAY];
    this.setFrameDelays(trafficLightFrameConfig, delays);
    this.anims.create(trafficLightFrameConfig);
    this.trafficLight.anims.play('trafficLight_anim');

    this.trafficLight.on('animationupdate', function () {
        const { index } = this.trafficLight.anims.currentFrame;
        switch (index) {
        case 1:
            this.trafficLightState = 'green';
            break;
        case 2:
            this.trafficLightState = 'yellow';
            break;
        default:
            this.trafficLightState = 'red';
        }
    }, this);

  }


  setFrameDelays(animationConfig, delays) {
    for (let i = 0; i < animationConfig.frames.length; i++) {
        animationConfig.frames[i].duration = delays[i];
        }
    }


  jumpTrampoline(player, trampoline) {
        // 플레이어의 밑면이 트램펄린의 윗면에 닿으면 수직 속도를 높임
        if (player.body.touching.down && trampoline.body.touching.up) {
            // 효과음 내기
            this.trampolineJumpSound.play();
            player.setVelocityY(-300);
        }
    }


  update(): void {
    
    if (this.trafficLightState === 'red') {
        if (this.player.x !== this.prevPlayerX || this.player.y !== this.prevPlayerY) {
            console.log('game over')
        }
    }

    this.prevPlayerX = this.player.x;
    this.prevPlayerY = this.player.y;


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
