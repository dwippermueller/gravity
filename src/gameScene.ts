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

    constructor() {
      super(sceneConfig);
    }
   
    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('player1', 'assets/player.png')
    }

    public create() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
      this.starfield = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'starfield')


        this.player = this.physics.add.sprite(40, 40, 'player1')
      this.player.body.setGravityY(100)


        this.player.body.setBounce(0.3, 0.3);

        this.player.body.setCollideWorldBounds(true)



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
          this.player.body.angularVelocity = 100
        } else if (cursorKeys.left.isDown) {
          this.player.body.angularVelocity = -100
        } else {
            this.player.body.angularVelocity = 0
        }
        
    }
}