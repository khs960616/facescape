import Phaser from 'phaser'
import { GameOverPopup } from './GameOverPopUp'



// npm run start


const PLAYER_X_VELOCITY = 160;
const PLAYER_Y_VELOCITY = -200;

const ASSET_MAP = 'assets/map';
const ASSET_CHARACTER = 'assets/character';
const ASSET_SUB = 'assets/sub';

export default class ExampleScene extends Phaser.Scene {

	// infra
	private ground!: Phaser.Physics.Arcade.StaticGroup;

	// rest
	private cannon!: Phaser.Physics.Arcade.Sprite;
	private cannonBalls!: Phaser.Physics.Arcade.Group;
	private fireTime!: number;
	private fireCount!: number;


	// players
	private player!: Phaser.Physics.Arcade.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor() {
		super('example-scene')
	}

	preload() {
		// 기본 맵 구성 이미지 로드
		this.load.image('sky', ASSET_MAP + '/sky.png');
		this.load.image('ground', ASSET_MAP + '/platform.png');

		// 맵 부가 기능(대포, 타이머, 열쇠 등등) 이미지 로드
		this.load.spritesheet('cannon', ASSET_SUB + '/Cannon.png', { frameWidth: 64, frameHeight: 64 });
		this.load.image('cannonBall', ASSET_SUB + '/CannonBall.png');


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
		// 대포 발사
		this.cannonBalls.getChildren().forEach((gameObj) => {
			// gameObj를 Sprite로 캐스팅
			const cannonBall = gameObj as Phaser.GameObjects.Sprite;

			if (cannonBall.x < 0) {
				this.cannonBalls.remove(cannonBall);
				cannonBall.destroy();
			}
		});


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
		this.cannon = this.physics.add.sprite(740, 510, 'cannon', 0);
		this.cannon.flipX = true;
		(this.cannon.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
		(this.cannon.body as Phaser.Physics.Arcade.Body).setImmovable(true);

		this.cannonBalls = this.physics.add.group();
		this.time.addEvent({
			//delay:  Phaser.Math.Between(5000, 9000),
			delay: Phaser.Math.Between(1000, 1000),
			callback: this.addCannonBall,
			callbackScope: this,
			loop: true
		});
		this.fireCount = 0;


	}


	createPlayerObject() {
		this.player = this.physics.add.sprite(100, 450, 'idle', 0);

		// 캐릭터와 여러 오브젝트의 충돌 설정
		this.physics.add.collider(this.player, this.ground);
		this.physics.add.collider(this.player, this.cannon);

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	createSubAnimation() {
		// 맵 서브 애니메이션 생성
		this.anims.create({
			key: 'cannon_anim',
			frames: this.anims.generateFrameNumbers('cannon', { start: 0, end: 5 }),
			frameRate: 5,
			repeat: -1
		});
		this.cannon.anims.play('cannon_anim');

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

	addCannonBall() {
		const cannonBall = this.physics.add.sprite(720, 510, 'cannonBall');
		this.cannonBalls.add(cannonBall);
		cannonBall.body.allowGravity = false; // 중력 영향 안 받음
		cannonBall.setVelocityX(-600); // 포탄의 X축 속도 설정

		// 충돌
		this.physics.add.collider(this.player, this.cannonBalls, this.gameOver, undefined, this);

	}



	gameOver() {
		this.physics.pause(); // 게임 일시 중지

		new GameOverPopup(this, 400, 300, '게임 오버', () => {
			this.scene.restart(); // 게임 재시작
		}).once("destroy", () => { });
	}





}
