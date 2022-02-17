export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet')
    }

    public fire(x: integer, y: integer, velocity: Phaser.Math.Vector2) {
        this.body.reset(x, y)
        this.active = true
        this.visible = true

        this.body.velocity.x += velocity.x
        this.body.velocity.y += velocity.y
    }

    public preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(!this.scene.physics.world.bounds.contains(this.x, this.y)) {
            this.active = false
            this.visible = false
        }
    }


}

const BULLET_SPEED = 500

export class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: Bullet,
            active: false,
            visible: false,
            key: 'bullet',
            repeat: 30
        })
    }

    public fireBullet(x: integer, y: integer, angle: integer) {
        const bullet = this.getFirstDead(false) as Bullet

        const bulletStart = this.scene.physics.velocityFromAngle(angle, 20)
        const velocity = this.scene.physics.velocityFromAngle(angle, BULLET_SPEED)
        bullet.fire(x + bulletStart.x, y + bulletStart.y, velocity)
    }

}

