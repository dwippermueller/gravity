import "phaser"
import { Game } from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
  };
  
export class GameScene extends Phaser.Scene {
    private player: Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody
    private starfield: Phaser.GameObjects.TileSprite
    private speed = 0

    constructor() {
      super(sceneConfig);
    }
   
    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('player1', 'assets/player.png')
    }

    public create() {
      this.starfield = this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'starfield')
      this.player = this.physics.add.sprite(40, 40, 'player1')
      this.player.body.setGravityY(50)
    }
   
    public update() {
        this.starfield.tilePositionY += 2
        const cursorKeys = this.input.keyboard.createCursorKeys()
        if (cursorKeys.space.isDown) {
            const velocity = this.physics.velocityFromAngle(this.player.body.rotation - 90, 5)
            this.player.body.velocity.x += velocity.x
            this.player.body.velocity.y += velocity.y
           }
 
        if (cursorKeys.right.isDown) {
          this.player.body.angularVelocity = 60
        } else if (cursorKeys.left.isDown) {
          this.player.body.angularVelocity = -60
        } else {
            this.player.body.angularVelocity = 0
        }
        
    }
}