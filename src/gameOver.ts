import {Scene} from "phaser";
import Sprite = Phaser.GameObjects.Sprite;
import Text = Phaser.GameObjects.Text;
import TextStyle = Phaser.GameObjects.TextStyle;
import Key = Phaser.Input.Keyboard.Key;

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'GameOver',
};

export class GameOverScene extends Scene {

    public loser: integer
    private spaceBar: Key
    private continue: Sprite

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('gameOver', 'assets/game-over.gif')
        this.load.image('winner1', 'assets/winner1.gif')
        this.load.image('winner2', 'assets/winner2.gif')
        this.load.image('continue', 'assets/splash/continue.png')
    }

    public create() {
        this.spaceBar = this.input.keyboard.createCursorKeys().space
        this.add.sprite(window.innerWidth / 2, window.innerHeight / 2 -200, 'gameOver')
        let text = ''
        if (this.loser == 1) {
            text = 'Player Two Wins!!!'
        } else {
            text = 'Player One Wins!!!'
        }
        this.add.text(window.innerWidth / 2 - 150, window.innerHeight / 2 - 100, text, {fontSize: '30px', color: '#ff0000'})
        this.continue = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2 + 100, 'continue')
        this.continue.scale = 0.5
    }

    public update() {
        if (this.spaceBar.isDown) {
            this.scene.start('Game')
        }
    }
}