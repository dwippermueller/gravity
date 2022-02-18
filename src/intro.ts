import Sprite = Phaser.GameObjects.Sprite
import Key = Phaser.Input.Keyboard.Key;
import Group = Phaser.GameObjects.Group;

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
    private controlGroup1: Group
    private controlGroup2: Group
    private spaceBar: Key
    private IMAGE_SCALE: number = 0.4
    private windowWidth = window.innerWidth
    private windowHeight = window.innerHeight

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
        this.load.spritesheet('starship1', 'assets/starship-sheet.png', { frameWidth: 208, frameHeight: 324 })
        this.load.spritesheet('starship2', 'assets/starship-sheet2.png', { frameWidth: 208, frameHeight: 324 })
        this.load.image('bullet', 'assets/enemy-bullet.png')
    }

    public create() {

        this.spaceBar = this.input.keyboard.createCursorKeys().space

        this.starfield = this.add.tileSprite(this.windowWidth / 2, this.windowHeight / 2, this.windowWidth, this.windowHeight, 'starfield')
        
        this.heading = this.add.sprite(this.windowWidth / 2, this.windowHeight / 2 - 300, 'heading')
        this.heading.visible = false
        this.heading.scale = this.IMAGE_SCALE

        this.title = this.add.sprite(this.windowWidth / 2, this.windowHeight / 2 - 100, 'title')
        this.title.visible = false
        this.title.scale = this.IMAGE_SCALE

        this.created = this.add.sprite(this.windowWidth / 2, this.windowHeight / 2 + 100, 'created')
        this.created.visible = false
        this.created.scale = this.IMAGE_SCALE

        this.continue = this.add.sprite(this.windowWidth / 2, this.windowHeight / 2 + 300, 'continue')
        this.continue.visible = false
        this.continue.scale = this.IMAGE_SCALE

        const ctrlYPos = this.windowHeight / 2 - 100
        const ctrlYGap = 100

        const controlBullet1 = this.add.sprite(100, ctrlYPos + 3 * ctrlYGap, 'bullet')
        this.controlGroup1 = this.add.group()
        this.controlGroup1.add(this.add.sprite(100, ctrlYPos, 'starship1', 4))
        this.controlGroup1.add(this.add.sprite(100, ctrlYPos + ctrlYGap, 'starship1', 1))
        this.controlGroup1.add(this.add.sprite(100, ctrlYPos + 2 * ctrlYGap , 'starship1', 3))
        this.controlGroup1.add(controlBullet1)
        this.controlGroup1.add(this.add.text(150, ctrlYPos - 30, 'W', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup1.add(this.add.text(150, ctrlYPos + ctrlYGap - 30, 'A', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup1.add(this.add.text(150, ctrlYPos + 2 * ctrlYGap - 30, 'D', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup1.add(this.add.text(150, ctrlYPos + 3 * ctrlYGap - 30, 'SHIFT', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup1.propertyValueSet('scale', 0.2)
        this.controlGroup1.propertyValueSet('visible', 0)
        controlBullet1.scale = 2

        const controlBullet2 = this.add.sprite(this.windowWidth - 100, ctrlYPos + 3 * ctrlYGap, 'bullet')
        this.controlGroup2 = this.add.group()
        this.controlGroup2.add(this.add.sprite(this.windowWidth - 100, ctrlYPos, 'starship2', 4))
        this.controlGroup2.add(this.add.sprite(this.windowWidth - 100, ctrlYPos + ctrlYGap, 'starship2', 1))
        this.controlGroup2.add(this.add.sprite(this.windowWidth - 100, ctrlYPos + 2 * ctrlYGap , 'starship2', 3))
        this.controlGroup2.add(controlBullet2)
        this.controlGroup2.add(this.add.text(this.windowWidth - 200, ctrlYPos - 30, '↑', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup2.add(this.add.text(this.windowWidth - 200, ctrlYPos + ctrlYGap - 30, '←', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup2.add(this.add.text(this.windowWidth - 200, ctrlYPos + 2 * ctrlYGap - 30, '→', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup2.add(this.add.text(this.windowWidth - 300, ctrlYPos + 3 * ctrlYGap - 30, 'SPACE', {fontSize: '200px', color: '#ff0000'}))
        this.controlGroup2.propertyValueSet('scale', 0.2)
        this.controlGroup2.propertyValueSet('visible', 0)
        controlBullet2.scale = 2

        this.createTime = this.game.getTime()
    }

    public update() {
        if (this.spaceBar.isDown) {
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
            this.controlGroup1.propertyValueSet('visible', 1)
            this.controlGroup2.propertyValueSet('visible', 1)
        }
    }
}
