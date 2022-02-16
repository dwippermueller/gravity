import "phaser"
import { Game } from "phaser";
import { BulletGroup } from "./bulletGroup";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private player: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
    private starfield: Phaser.GameObjects.TileSprite
    private bullets: BulletGroup
    private bulletTime: number = 0

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('player1', 'assets/player.png')
        this.load.image('bullet', 'assets/enemy-bullet.png')
    }

    public create() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        this.starfield = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'starfield')


        this.player = this.physics.add.sprite(40, 40, 'player1')
        this.player.body.setGravityY(100)
        this.player.body.setBounce(0.3, 0.3);
        this.player.body.setCollideWorldBounds(true)

        this.bullets = new BulletGroup(this)
    }

    public update() {
        this.starfield.tilePositionY += 2

        const cursorKeys = this.input.keyboard.createCursorKeys()
        if (cursorKeys.up.isDown) {
            const velocity = this.physics.velocityFromAngle(this.player.body.rotation - 90, 5)
            this.player.body.velocity.x += velocity.x
            this.player.body.velocity.y += velocity.y
        }
        if (cursorKeys.space.isDown) {
            if (this.game.getTime() > this.bulletTime) {
                const velocity = this.physics.velocityFromAngle(this.player.body.rotation - 90, 500)
                this.bullets.fireBullet(this.player.body.x, this.player.body.y, velocity)
                this.bulletTime = this.game.getTime() + 200
            }
        }
       
        if (cursorKeys.right.isDown) {
            this.player.body.angularVelocity = 100
        } else if (cursorKeys.left.isDown) {
            this.player.body.angularVelocity = -100
        } else {
            this.player.body.angularVelocity = 0
        }

    }

}