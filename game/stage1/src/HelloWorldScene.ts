import Phaser from 'phaser'
import { GamePopUp } from './GamePopUp'



// npm run start

//====== player setting ===============
const PLAYER_X_VELOCITY = 160;
const PLAYER_Y_VELOCITY = -300;
const PLAYER_START_X = 300;
const PLAYER_START_Y = 400;

//====== wall setting ==============
const WALL_START_X = 100;
const WALL_START_Y = 100;
const WALL_GAP = 60;
const WALL_Y_OFFSET = 5; // Positioned slightly above the wall below it



//======== assets dir =================
const ASSET_MAP = 'assets/map';
const ASSET_CHARACTER = 'assets/character';
const ASSET_SUB = 'assets/sub';
const ASSET_POPUP = 'assets/popup';


export default class ExampleScene extends Phaser.Scene {

	// infra
	private ground!: Phaser.Physics.Arcade.StaticGroup;

	// rest
	private cannon!: Phaser.Physics.Arcade.Sprite;
	private cannonBalls!: Phaser.Physics.Arcade.Group;
	private walls!: Phaser.Physics.Arcade.Group;
	private key!: Phaser.Physics.Arcade.Sprite;
	private keyPickup=false;
	private keyPlayerCollider!: Phaser.Physics.Arcade.Collider;
	private portal!: Phaser.Physics.Arcade.Sprite;

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
		this.load.image('wall', ASSET_SUB + '/Wall.png');
		this.load.image('key', ASSET_SUB + '/Key.png');
		this.load.spritesheet('portal', ASSET_SUB + '/EndPortal.png', { frameWidth: 80, frameHeight: 80 ,endFrame:38});
		this.load.image('notice', ASSET_POPUP + '/notice.png');

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
		} 
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(PLAYER_X_VELOCITY);
			this.player.anims.play('run_anim', true);
			this.player.flipX = false;
		} 
		else {
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
		} 

		else if (this.player.body.velocity.y < 0 && !this.player.body.touching.down) {
			this.player.anims.play('jump_anim', true);
		}

		if (this.keyPickup) {
			this.key.setX(this.player.x);
			this.key.setY(this.player.y - 35);
			this.cannon.destroy();
		}


		
		if (this.keyPickup && this.portal.active && this.portal.getBounds().contains(this.key.x, this.key.y)) {
			this.gameClear();
		}
		
		
	}


	createMapObject() {
		this.add.image(400, 300, 'sky');
		this.ground = this.physics.add.staticGroup();
		this.ground.create(400, 568, 'ground').setScale(2).refreshBody();
	}

	createSubObject() {
		this.cannon = this.physics.add.sprite(700, 510, 'cannon', 0);
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

		this.walls = this.physics.add.group();
		this.addWall();
		this.physics.add.collider(this.ground, this.walls);
		this.physics.add.collider(this.walls, this.walls);

		this.physics.add.collider(this.cannonBalls, this.walls, (cannonBall,wall)=>	{cannonBall.destroy();
		wall.destroy();}, undefined, this);

		this.key = this.physics.add.sprite(50, 510, 'key', 0).setScale(0.1);
		this.physics.add.collider(this.key, this.ground);

		this.portal = this.physics.add.sprite(this.cannon.x+60, this.cannon.y-15, 'portal',0);
		this.portal.setActive(false);
		this.portal.setVisible(false);
		this.physics.add.collider(this.portal, this.ground);

	}


	createPlayerObject() {
		this.player = this.physics.add.sprite(PLAYER_START_X, PLAYER_START_Y, 'idle', 0);

		// 캐릭터와 여러 오브젝트의 충돌 설정
		this.physics.add.collider(this.player, this.ground);
		this.physics.add.collider(this.player, this.cannon);

		this.player.setBounce(0.1);
		this.player.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();

		this.physics.add.collider(this.player, this.walls);
		// 키와 플레이어의 충돌 설정 및 콜백 함수 호출
		this.keyPlayerCollider = this.physics.add.collider(this.player, this.key, this.pickUpKey, undefined, this);
		
		this.physics.add.collider(this.player, this.walls, this.gameOver, undefined, this);
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
		// 남아있는 wall 개수 확인
		const remainingWalls = this.walls.countActive(true);

		// 남아있는 wall이 없다면 포탄 발사하지 않음
		if (remainingWalls === 0) {
			return;
		}

		const cannonBall = this.physics.add.sprite(720, 510, 'cannonBall');
		this.cannonBalls.add(cannonBall);
		cannonBall.body.allowGravity = false;
		cannonBall.setVelocityX(-600); // 포탄의 X축 속도 설정

		// 충돌
		this.physics.add.collider(this.player, this.cannonBalls, this.gameOver, undefined, this);
	}

	addWall() {
		for (let i = 0; i < 3; i++) {
			const positionY = WALL_START_Y + (100*i);
			const wall = this.physics.add.sprite(WALL_START_X, positionY, 'wall').setScale(0.05);
			wall.body.allowGravity = true;
			
			this.walls.add(wall);
		}
	}



	pickUpKey() {
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


	gameOver() {
		this.physics.pause(); // 게임 일시 중지

		new GamePopUp(
			this
			, 400
			, 300
			, () => {
				this.keyPickup=false;
				this.scene.restart();
				}
			, '게임 오버'
			, ' '
			, '다시 도전'
			, 'notice'
		)
	}

	gameClear(){
		this.physics.pause(); // 게임 일시 중지

		new GamePopUp(
			this
			, 400
			, 300
			, () => {
				this.keyPickup=false;
				this.scene.restart();
				}
			, '게임 클리어!!'
			, ' '
			, '다시 도전'
			, 'notice'
		)
	}

}
