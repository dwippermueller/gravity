import { BulletGroup } from "./bulletGroup";
import * as Phaser from "phaser";
import { Player } from "./player";
import {AsteroidGroup} from "./asteroidGroup";
import Group = Phaser.GameObjects.Group;
import Sprite = Phaser.GameObjects.Sprite


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private player1: Player
    private player2: Player
    private starfield: Phaser.GameObjects.TileSprite
    public bullets: BulletGroup
    public asteroids: AsteroidGroup
    private asteroidTime: number = 0

    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('bullet', 'assets/enemy-bullet.png')
        this.load.image('asteroid', 'assets/asteroid.png')
        this.load.spritesheet('starship1', 'assets/starship-sheet.png', { frameWidth: 208, frameHeight: 324 })
        this.load.spritesheet('starship2', 'assets/starship-sheet2.png', { frameWidth: 208, frameHeight: 324 })
        this.load.spritesheet('explosion', 'assets/explode.png', { frameWidth: 128, frameHeight: 128 })
    }

    public create() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        this.starfield = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'starfield')
        this.player1 = new Player(this, 'starship1', 1, 200, 400)
        this.player2 = new Player(this, 'starship2', 2, windowWidth - 200, 400)
        this.asteroids = new AsteroidGroup(this)
        this.bullets = new BulletGroup(this)
        this.player1.initColliders(this.bullets, this.asteroids)
        this.player2.initColliders(this.bullets, this.asteroids)
        this.reset()
    }

    public update() {
        this.starfield.tilePositionY += 2
        const cursorKeys = this.input.keyboard.createCursorKeys()
        const wKey = this.input.keyboard.addKey('W')
        const aKey = this.input.keyboard.addKey('A')
        const dKey = this.input.keyboard.addKey('D')

        this.player1.update(cursorKeys.up, cursorKeys.space, cursorKeys.left, cursorKeys.right, this.bullets)
        this.player2.update(wKey, cursorKeys.shift, aKey, dKey, this.bullets)

        if (this.game.getTime() > this.asteroidTime) {
            this.asteroids.spawn()
            this.asteroidTime = this.game.getTime() + 2000
        }
    }

    public reset() {
        this.bullets.children.each(c => {
            let bullet = c as Sprite
            bullet.x = -100
            bullet.y = -100
            bullet.body.velocity.x = 0
            bullet.body.velocity.y = 0
            bullet.active = false
            bullet.visible = false
        })

        this.asteroids.children.each(c => {
            let asteroid = c as Sprite
            asteroid.x = -100
            asteroid.y = -100 
            asteroid.body.velocity.x = 0
            asteroid.body.velocity.y = 0    
            asteroid.active = false
            asteroid.visible = false                 
        })

        this.player1.reset()
        this.player2.reset()
    }
}