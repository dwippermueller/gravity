import { BulletGroup } from "./bulletGroup"
import GameObjectWithDynamicBody = Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
import Sprite = Phaser.GameObjects.Sprite

const TURNING_SPEED = 200
const THRUST_SPEED = 10
const BULLET_SPEED = 500

export class Player {
    
    private scene: Phaser.Scene
    private sprite: GameObjectWithDynamicBody
    private noThrustKey: string
    private thrustKey: string

    constructor(scene: Phaser.Scene, key: string, playerNumber: integer, xPos: integer, yPos: integer) {
        this.scene = scene
        this.noThrustKey = 'thrust' + playerNumber
        this.thrustKey = 'no-thrust' + playerNumber
    
        let player = scene.physics.add.sprite(xPos, yPos, key)
        player.scale = 0.2
        player.body.setGravityY(70)
        player.body.setBounce(0.3, 0.3);
        player.body.setCollideWorldBounds(true)
        this.sprite = player

        scene.anims.create({
            key: this.noThrustKey,
            frames: scene.anims.generateFrameNumbers('starship' + playerNumber, { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })
        scene.anims.create({
            key: this.thrustKey,
            frames: scene.anims.generateFrameNumbers('starship' + playerNumber, { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        })
    }

    public update(
        thrust: Phaser.Input.Keyboard.Key,
        fire: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
        bullets: BulletGroup
    ) {
        if (thrust.isDown) {
            (this.sprite as Sprite).anims.play(this.thrustKey, true)
            const velocity = this.scene.physics.velocityFromAngle(this.sprite.body.rotation - 90, THRUST_SPEED)
            this.sprite.body.velocity.x += velocity.x
            this.sprite.body.velocity.y += velocity.y
        } else {
            (this.sprite as Sprite).anims.play(this.noThrustKey, true)
        }
        if (Phaser.Input.Keyboard.JustDown(fire)) {
            const velocity = this.scene.physics.velocityFromAngle(this.sprite.body.rotation - 90, BULLET_SPEED)
            bullets.fireBullet(this.sprite.body.x + 15, this.sprite.body.y + 20, velocity.add(this.sprite.body.velocity))
        }

        if (right.isDown) {
            this.sprite.body.angularVelocity = TURNING_SPEED
        } else if (left.isDown) {
            this.sprite.body.angularVelocity = -TURNING_SPEED
        } else {
            this.sprite.body.angularVelocity = 0
        }
    }
}