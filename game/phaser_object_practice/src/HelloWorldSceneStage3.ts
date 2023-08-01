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

	// 신호등 판정 변수
	private trafficLightState: string = 'green';
	private prevPlayerX: number = 0;
	private prevPlayerY: number = 0;

	// 게임 클리어 관련 (열쇠, 포탈)
	private key!: Phaser.Physics.Arcade.Sprite;
	private keyPickup=false;
	private keyPlayerCollider!: Phaser.Physics.Arcade.Collider;
	private portal!: Phaser.Physics.Arcade.Sprite;

	constructor() {
		super('example-scene')
	}

	preload() {
		// 기본 맵 구성 이미지 로드
		this.load.image('sky', ASSET_MAP + '/sky.png');
		this.load.image('ground', ASSET_MAP + '/platform.png');

		// 맵 부가 기능(대포, 타이머, 열쇠 등등) 이미지 로드
		this.load.spritesheet('trafficLight', ASSET_SUB + '/TrafficLight.png', { frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet('trampoline', ASSET_SUB + '/Trampoline.png', { frameWidth: 164, frameHeight: 164 });
		this.load.audio('trampolineJumpSound', ASSET_AUDIO + '/Trampoline.wav');
		this.load.image('spikeTrap', ASSET_SUB + '/SpikeTrap.png');

		this.load.image('key', ASSET_SUB + '/Key.png');
		this.load.spritesheet('portal', ASSET_SUB + '/EndPortal.png', { frameWidth: 80, frameHeight: 80 ,endFrame:38});


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
		
		// 신호등 판정
		if (this.trafficLightState === 'red') {
			if (this.player.x !== this.prevPlayerX || this.player.y !== this.prevPlayerY) {
				this.gameOver();
			}
		}

		this.prevPlayerX = this.player.x;
		this.prevPlayerY = this.player.y;


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

		// console.log('Traffic light state:', this.trafficLightState);

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
		

		this.key = this.physics.add.sprite(50, 510, 'key', 0).setScale(0.1);
		this.physics.add.collider(this.key, this.ground);

		this.portal = this.physics.add.sprite(100, 200, 'portal',0);
		this.portal.setActive(false);
		this.portal.setVisible(false);
		this.physics.add.collider(this.portal, this.ground);

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

		this.keyPlayerCollider = this.physics.add.collider(this.player, this.key, this.pickUpKey, undefined, this);
		
		this.physics.add.collider(this.player, this.walls, this.gameOver, undefined, this);
	}

	createSubAnimation() {

		// 신호등 시간 설정 (/1000 = 초)
		const GREEN_DELAY = 3000;
		const YELLOW_DELAY = 200;
		const RED_DELAY = 1000;

		// 맵 서브 애니메이션 생성
		const trafficLightFrames = this.anims.generateFrameNumbers('trafficLight', { start: 0, end: 3 });
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
		

		// 포탈 애니메이션 구성
		this.anims.create({
			key: 'portalActive',
			frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 38 }),
			frameRate: 10,
			repeat: 0
		});
		this.portal.anims.play('portalActive');
		this.portal.once('animationcomplete', () => {
			this.portal.setFrame(35);
		});
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

	pickUpKey(player, key) {
		// 물리 충돌 제거
		this.physics.world.removeCollider(this.keyPlayerCollider);

		// 키 위에 플래그 설정
		this.keyPickup = true;

		// 키의 body를 비활성화
		this.key.body.enable = false;

		this.portal.setActive(true);
		this.portal.setVisible(true);
		//this.portal.anims.play('portalActive');
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


	gameOver() {
		this.physics.pause(); // 게임 일시 중지
		this.trafficLightState = 'green';

		new GamePopup(this, 400, 300, '게임 오버', () => {
			this.scene.restart(); // 게임 재시작
		}).once("destroy", () => { });
	}


}
