import Sprite = Phaser.GameObjects.Sprite

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Intro',
};

const TIME_TO_HEADING: number = 2000
const TIME_TO_TITLE: number = 4000
const TIME_TO_CREATED: number = 6000
const TIME_TO_CONTINUE: number = 8000

export class IntroScene extends Phaser.Scene {
    private starfield: Phaser.GameObjects.TileSprite
    private heading: Sprite
    private title: Sprite
    private created: Sprite
    private continue: Sprite

    private createTime: number

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('heading', 'assets/splash/heading.png')
        this.load.image('title', 'assets/splash/title.png')
        this.load.image('created', 'assets/splash/created.png')
        this.load.image('continue', 'assets/splash/continue.png')
    }

    public create() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        this.starfield = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'starfield')
        
        this.heading = this.add.sprite(windowWidth / 2, windowHeight / 2 - 200, 'heading')
        this.heading.visible = false
        this.heading.scale = 0.5

        this.title = this.add.sprite(windowWidth / 2, windowHeight / 2, 'title')
        this.title.visible = false
        this.title.scale = 0.5

        this.created = this.add.sprite(windowWidth / 2, windowHeight / 2 + 200, 'created')
        this.created.visible = false
        this.created.scale = 0.5

        this.continue = this.add.sprite(windowWidth / 2, windowHeight / 2 + 400, 'continue')
        this.continue.visible = false
        this.continue.scale = 0.5

        this.createTime = this.game.getTime()
    }

    public update() {
        const spaceBar = this.input.keyboard.createCursorKeys().space
        if (spaceBar.isDown) {
            this.scene.start('Game')
        }
        this.starfield.tilePositionY += 2
        const timePassed = this.game.getTime() - this.createTime

        if (timePassed > TIME_TO_HEADING) {
            this.heading.visible = true
        }

        if (timePassed > TIME_TO_TITLE) {
            this.title.visible = true
        }

        if (timePassed > TIME_TO_CREATED) {
            this.created.visible = true
        }

        if (timePassed > TIME_TO_CONTINUE) {
            this.continue.visible = true
        }
    }
}
