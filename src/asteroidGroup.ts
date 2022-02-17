import GameObjectWithDynamicBody = Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody

export class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'asteroid')
    }

    public spawn() {
        this.body.reset(Math.random() * this.scene.game.canvas.width, -70)
        this.active = true
        this.visible = true
        this.scale = 0.2 + Math.random() * 0.6

        this.body.velocity.y = Math.random() * 100 + 50;
        (this as GameObjectWithDynamicBody).body.angularVelocity = -20 + Math.random() * 40
    }

    public preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y > window.innerHeight + 50) {
            this.active = false
            this.visible = false
            this.setVelocityX(0)
            this.setVelocityY(0)
        }
    }
}
export class AsteroidGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)

        this.createMultiple({
            classType: Asteroid,
            active: false,
            visible: false,
            key: 'asteroid',
            repeat: 30
        })
    }

    public spawn() {
        const asteroid = this.getFirstDead(false) as Asteroid
        asteroid.spawn()
    }

}

