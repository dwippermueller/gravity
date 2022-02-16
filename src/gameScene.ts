import "phaser"
import { Game } from "phaser";
import { BulletGroup } from "./bulletGroup";
import Map = Phaser.Structs.Map;
import GameObjectWithDynamicBody = Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody;
import * as Phaser from "phaser";

enum keys {
    RIGHT, LEFT, FIRE, THRUST
}


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private player1: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
    private player2: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
    private starfield: Phaser.GameObjects.TileSprite
    private bullets: BulletGroup
    private bulletTime: number = 0

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('player1', 'assets/player.png')
        this.load.image('player2', 'assets/player2.png')
        this.load.image('bullet', 'assets/enemy-bullet.png')
        this.load.spritesheet('starship', 'assets/starship-sheet.png', {frameWidth: 208, frameHeight: 324})
    }

    public create() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        this.starfield = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'starfield')

        this.anims.create({
            key: 'no-thrust',
            frames: this.anims.generateFrameNumbers('starship', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNumbers('starship', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        })
        
        this.player1 = this.createPlayer('starship', 40, 40, 0.2)
        this.player2 = this.createPlayer('starship', 400, 400, 0.2)

        this.bullets = new BulletGroup(this)
    }

    public createPlayer(sprite : string, xPos : integer, yPos : integer, scale = 1) {
        let player = this.physics.add.sprite(xPos, yPos, sprite)
        player.scale = scale
        player.body.setGravityY(70)
        player.body.setBounce(0.3, 0.3);
        player.body.setCollideWorldBounds(true)
        return player
    }

    public update() {
        this.starfield.tilePositionY += 2
        const cursorKeys = this.input.keyboard.createCursorKeys()
        const wKey = this.input.keyboard.addKey('W')
        const aKey = this.input.keyboard.addKey('A')
        const dKey = this.input.keyboard.addKey('D')

        this.movePlayer(this.player1, cursorKeys.up, cursorKeys.space, cursorKeys.left, cursorKeys.right)
        this.movePlayer(this.player2, wKey, cursorKeys.shift, aKey, dKey)
    }

    public movePlayer(
        player : GameObjectWithDynamicBody,
        thrust : Phaser.Input.Keyboard.Key,
        fire : Phaser.Input.Keyboard.Key,
        left : Phaser.Input.Keyboard.Key,
        right : Phaser.Input.Keyboard.Key
    ) {
        if (thrust.isDown) {
            (player as Phaser.GameObjects.Sprite).anims.play('thrust', true)
            const velocity = this.physics.velocityFromAngle(player.body.rotation - 90, 10)
            player.body.velocity.x += velocity.x
            player.body.velocity.y += velocity.y
        } else {
            (player as Phaser.GameObjects.Sprite).anims.play('no-thrust', true)
        }
        if (fire.isDown) {
            if (this.game.getTime() > this.bulletTime) {
                const velocity = this.physics.velocityFromAngle(player.body.rotation - 90, 500)
                this.bullets.fireBullet(player.body.x, player.body.y, velocity)
                this.bulletTime = this.game.getTime() + 150
            }
        }

        if (right.isDown) {
            player.body.angularVelocity = 200
        } else if (left.isDown) {
            player.body.angularVelocity = -200
        } else {
            player.body.angularVelocity = 0
        }
    }
}