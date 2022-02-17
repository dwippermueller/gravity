import GameObjectWithDynamicBody = Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody

export class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'asteroid')
    }

    public spawn() {
        this.body.reset(Math.random() * this.scene.game.canvas.width, -70)
        this.active = true
        this.visible = true

        this.body.velocity.y = Math.random() * 100 + 50;
        (this as GameObjectWithDynamicBody).body.angularVelocity = -20 + Math.random() * 40
    }

    public preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y > this.scene.game.canvas.height + 150) {
            this.active = false
            this.visible = false
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

