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

    public fireBullet(x: integer, y: integer, velocity: Phaser.Math.Vector2) {
        const bullet = this.getFirstDead(false) as Bullet
        bullet.fire(x + 10, y + 10, velocity)
    }

}

