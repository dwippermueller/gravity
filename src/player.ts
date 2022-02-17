import { BulletGroup } from "./bulletGroup"
import GameObjectWithDynamicBody = Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
import Sprite = Phaser.GameObjects.Sprite
import GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;
import {GameScene} from "./gameScene";
import Group = Phaser.GameObjects.Group;
import Collider = Phaser.Physics.Arcade.Collider
import { AsteroidGroup } from "./asteroidGroup";

const TURNING_SPEED = 200
const THRUST_SPEED = 10

export class Player {
    
    private scene: GameScene
    public sprite: GameObjectWithDynamicBody
    private noThrustKey: string
    private thrustKey: string
    private xStartPosition: integer
    private yStartPosition: integer
    public hasCollided: boolean = false
    public explosionTime: number = 0
    private bulletCollider: Collider
    private asteroidCollider: Collider
    private lives: Group

    constructor(scene: GameScene, key: string, playerNumber: integer, xPos: integer, yPos: integer) {
        this.scene = scene
        this.xStartPosition = xPos
        this.yStartPosition = yPos
        
        this.noThrustKey = 'thrust' + playerNumber
        this.thrustKey = 'no-thrust' + playerNumber
    
        let player = scene.physics.add.sprite(xPos, yPos, key)
        player.scale = 0.2
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
        scene.anims.create({
            key: 'explode',
            frames: scene.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1
        })

        this.lives = this.scene.add.group()
        for (let i = 0; i < 3; i++) {
            let ship = this.lives.create(xPos + (30 * i), 60, 'starship1');
            ship.scale = 0.1
            ship.alpha = 0.4;
        }
    }

    public update(
        thrust: Phaser.Input.Keyboard.Key,
        fire: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
        bullets: BulletGroup
    ) {
        if (this.hasCollided) {
            if (this.sprite.scene.game.getTime() < this.explosionTime + 1000) {
                (this.sprite as Sprite).anims.play('explode', true);
            } else {
                (this.scene as GameScene).reset()
            }
            return
        }

        if (thrust.isDown) {
            (this.sprite as Sprite).anims.play(this.thrustKey, true)
            const velocity = this.scene.physics.velocityFromAngle(this.sprite.body.rotation - 90, THRUST_SPEED)
            this.sprite.body.velocity.x += velocity.x
            this.sprite.body.velocity.y += velocity.y
        } else {
            (this.sprite as Sprite).anims.play(this.noThrustKey, true)
        }
        if (Phaser.Input.Keyboard.JustDown(fire)) {
            bullets.fireBullet(this.sprite.body.x + 15, this.sprite.body.y + 20, this.sprite.body.rotation - 90)
        }

        if (right.isDown) {
            this.sprite.body.angularVelocity = TURNING_SPEED
        } else if (left.isDown) {
            this.sprite.body.angularVelocity = -TURNING_SPEED
        } else {
            this.sprite.body.angularVelocity = 0
        }
    }

    public reset() {
        this.sprite.body.reset(this.xStartPosition, this.yStartPosition)
        this.sprite.body.enable = true
        this.hasCollided = false
        this.explosionTime = 0
        this.bulletCollider.active = true
        this.asteroidCollider.active = true
    }

    public initColliders(bullets: BulletGroup, asteroids: AsteroidGroup) {
        this.bulletCollider = this.scene.physics.add.collider(this.sprite, bullets, this.hit);
        this.asteroidCollider = this.scene.physics.add.collider(this.sprite, asteroids, this.hit);
    }

    hit = (player : GameObjectWithBody, bullet : GameObjectWithBody) => {
        this.explosionTime = this.sprite.scene.game.getTime()
        const life = this.lives.getFirstAlive()
        if (life) {
            life.visible = false
            life.active = false
            this.hasCollided = true
            this.bulletCollider.active = false
            this.asteroidCollider.active = false
        }
    }
}