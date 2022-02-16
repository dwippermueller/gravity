import "phaser"

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
  };
  
export class GameScene extends Phaser.Scene {
    private player: Phaser.GameObjects.Sprite
    private starfield: Phaser.GameObjects.TileSprite

    constructor() {
      super(sceneConfig);
    }
   
    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('player1', 'assets/player.png')
    }

    public create() {
      this.starfield = this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, 'starfield')
      this.player = this.add.sprite(40, 40, 'player1')
      this.physics.add.existing(this.player)
    }
   
    public update() {
        this.starfield.tilePositionY += 2
        const cursorKeys = this.input.keyboard.createCursorKeys()
 
        if (cursorKeys.up.isDown) {
          this.player.body.velocity.y = -500
        } else if (cursorKeys.down.isDown) {
            this.player.body.velocity.y = 500
        } else {
            this.player.body.velocity.y = 0
        }
         
        if (cursorKeys.right.isDown) {
          this.player.body.velocity.x = 500
        } else if (cursorKeys.left.isDown) {
          this.player.body.velocity.x = -500
        } else {
          this.player.body.velocity.x = 0
        }
        
    }
}