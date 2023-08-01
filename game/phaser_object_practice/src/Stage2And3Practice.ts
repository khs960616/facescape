import Phaser from 'phaser'
import { GamePopup } from './GamePopUp'



// npm run start


const PLAYER_X_VELOCITY = 160;
const PLAYER_Y_VELOCITY = -200;

const ASSET_MAP = 'assets/map';
const ASSET_CHARACTER = 'assets/character';
const ASSET_SUB = 'assets/sub';
const ASSET_AUDIO = 'assets/audio';

export default class ExampleScene extends Phaser.Scene {

	// infra
	private ground!: Phaser.Physics.Arcade.StaticGroup;

	// rest
	private trafficLight!: Phaser.Physics.Arcade.Sprite;
	private trampoline!: Phaser.Physics.Arcade.Sprite;
	private spikeTrap!: Phaser.Physics.Arcade.Sprite;

	// players
	private player!: Phaser.Physics.Arcade.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;


	// 시간 게이지
	private gauge: Phaser.GameObjects.Graphics;
	// 시간 게이지 길이
	private gaugeWidth: number = 200;
	// 시간 게이지 시간
	private totalTime: number = 90;
	private remainingTime: number = this.totalTime;


	constructor() {
		super('example-scene')
	}

	preload() {
		// 기본 맵 구성 이미지 로드
		this.load.image('sky', ASSET_MAP + '/sky.png');
		this.load.image('ground', ASSET_MAP + '/platform.png');

		// 맵 부가 기능(대포, 타이머, 열쇠 등등) 이미지 로드\
		this.load.spritesheet('trafficLight', ASSET_SUB + '/TrafficLight.png', { frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet('trampoline', ASSET_SUB + '/Trampoline.png', { frameWidth: 164, frameHeight: 164 });
		this.load.audio('trampolineJumpSound', ASSET_AUDIO + '/Trampoline.wav');
		this.load.image('spikeTrap', ASSET_SUB + '/SpikeTrap.png');

		// 캐릭터 이미지 로드
		this.load.spritesheet('idle', ASSET_CHARACTER + '/Idle.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('jump', ASSET_CHARACTER + '/Jump.png');
		this.load.image('fall', ASSET_CHARACTER + '/Fall.png');
		this.load.spritesheet('run', ASSET_CHARACTER + '/Run.png', { frameWidth: 32, frameHeight: 32 });
	}

	create() {


		// 맵 기본
		this.createMapObject();

		// 맵 서브
		this.createSubObject();

		// 캐릭터
		this.createPlayerObject();

		// 서브 오브젝트 애니메이션 설정
		this.createSubAnimation();

		// 플레이어 애니메이션 설정
		this.createPlayerAnimation();


	}

	update() {

		// 캐릭터 이동
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-1 * PLAYER_X_VELOCITY);
			this.player.anims.play('run_anim', true);
			this.player.flipX = true;
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(PLAYER_X_VELOCITY);
			this.player.anims.play('run_anim', true);
			this.player.flipX = false;
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('idle_anim', true);
		}

		// 점프
		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(PLAYER_Y_VELOCITY);
			this.player.anims.play('jump_anim');
		}

		// 점프, 떨어지는 동작
		if (this.player.body.velocity.y > 0) {
			this.player.anims.play('fall_anim', true);
		} else if (this.player.body.velocity.y < 0 && !this.player.body.touching.down) {
			this.player.anims.play('jump_anim', true);
		}
	}


	createMapObject() {
		this.add.image(400, 300, 'sky');
		this.ground = this.physics.add.staticGroup();
		this.ground.create(400, 568, 'ground').setScale(2).refreshBody();
	}

	createSubObject() {
		this.trafficLight = this.physics.add.sprite(400, 100, 'traffic_light', 0);
		(this.trafficLight.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
		(this.trafficLight.body as Phaser.Physics.Arcade.Body).setImmovable(true);

		this.trampoline = this.physics.add.sprite(400, 500, 'trampoline', 0);
		(this.trampoline.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
		(this.trampoline.body as Phaser.Physics.Arcade.Body).setImmovable(true);

		this.spikeTrap = this.physics.add.sprite(600, 500, 'spikeTrap', 0);
		this.spikeTrap.setScale(0.2);
		(this.spikeTrap.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
		(this.spikeTrap.body as Phaser.Physics.Arcade.Body).setImmovable(true);

		// 왼쪽 위에 시간 표시
		this.clockText = this.add.text(10, 10, '00:00', {
			font: '30px Arial',
			fill: '#ffffff'
		}).setScrollFactor(0); 
	
		// 시간 게이지
		this.gauge = this.add.graphics();
		this.updateGauge(); // Initial update
	
		// 매 초마다 시간 게이지 감소
		this.time.addEvent({
			delay: 1000,
			callback: this.decreaseGauge,
			callbackScope: this,
			loop: true
		});

	}


	
	createPlayerObject() {
		this.player = this.physics.add.sprite(100, 450, 'idle', 0);

		// 캐릭터와 여러 오브젝트의 충돌 설정
		this.physics.add.collider(this.player, this.ground);

		// 트램펄린 충돌
		this.trampolineJumpSound = this.sound.add('trampolineJumpSound');
		this.physics.add.collider(this.player, this.trampoline, this.jumpTrampoline, null, this);

		// 가시 충돌
		this.physics.add.collider(this.player, this.spikeTrap, this.collideSpikeTrap, null, this);

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	createSubAnimation() {
		// 맵 서브 애니메이션 생성

		const trafficLightFrames = this.anims.generateFrameNumbers('trafficLight', { start: 0, end: 4 });
		const trafficLightFrameConfig = {
			key: 'trafficLight_anim',
			frames: trafficLightFrames,
			frameRate: 1,
			repeat: -1
		};
		
		// 초록-노랑-빨강 순서대로 지연 시간 배분
		const delays = [5000, 500, 2000];
		this.setFrameDelays(trafficLightFrameConfig, delays); 
		this.anims.create(trafficLightFrameConfig);
		this.trafficLight.anims.play('trafficLight_anim');
		
	}


	setFrameDelays(animationConfig, delays) {
		if (animationConfig && animationConfig.frames && delays.length === animationConfig.frames.length - 1) {
			const frameData = animationConfig.frames.slice();
			animationConfig.frames = [];
			for (let i = 0; i < frameData.length - 1; i++) {
				animationConfig.frames.push({ ...frameData[i], duration: delays[i] });
			}
			animationConfig.frames.push(frameData[frameData.length - 1]);
		}
	}

	
	createPlayerAnimation() {
		// 캐릭터  애니메이션 생성
		this.anims.create({
			key: 'idle_anim',
			frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 10 }),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'run_anim',
			frames: this.anims.generateFrameNumbers('run', { start: 0, end: 10 }),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'jump_anim',
			frames: [{ key: 'jump' }],
			frameRate: 1,
		});

		this.anims.create({
			key: 'fall_anim',
			frames: [{ key: 'fall' }],
			frameRate: 1,
		});
	}


	jumpTrampoline(player, trampoline) {
		// 플레이어의 밑면이 트램펄린의 윗면에 닿으면 수직 속도를 높임
		if (player.body.touching.down && trampoline.body.touching.up) {
			// 효과음 내기
			this.trampolineJumpSound.play();
			player.setVelocityY(-300);
		}

	}


	collideSpikeTrap() {
		// 가시에 닿으면 게임오버
		this.gameOver()
	}


	updateGauge() {
		// 시간 게이지 세팅
		this.gauge.clear();
		this.gauge.fillStyle(0x00ff00);
		this.gauge.fillRect(10, 50, this.gaugeWidth * (this.remainingTime / this.totalTime), 20);
	}


	decreaseGauge() {
		// 시간 게이지 1초씩 감소
		this.remainingTime -= 1;
		this.updateGauge();
	
		// 시간 게이지가 다 끝나면 게임오버
		if (this.remainingTime <= 0) {
			this.gameOver()
		}
	}


	gameOver() {
		this.physics.pause(); // 게임 일시 중지

		new GamePopup(this, 400, 300, '게임 오버', () => {
			this.scene.restart(); // 게임 재시작
		}).once("destroy", () => { });
	}





}
