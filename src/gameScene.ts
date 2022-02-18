import { BulletGroup } from "./bulletGroup";
import * as Phaser from "phaser";
import { Player } from "./player";
import {AsteroidGroup} from "./asteroidGroup";
import Group = Phaser.GameObjects.Group;
import Sprite = Phaser.GameObjects.Sprite
import BaseSound = Phaser.Sound.BaseSound;
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
import Key = Phaser.Input.Keyboard.Key

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private player1: Player
    private player2: Player
    private starfield: Phaser.GameObjects.TileSprite
    private cursorKeys: CursorKeys
    private wKey: Key
    private aKey: Key
    private dKey: Key
    public bullets: BulletGroup
    public asteroids: AsteroidGroup
    private asteroidTime: number = 0
    public fireSound: BaseSound
    public explosionSound: BaseSound
    public thrustSound: BaseSound

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
        this.load.audio('pew', 'assets/sound/pew.mp3')
        this.load.audio('explosion', 'assets/sound/explosion.mp3')
        this.load.audio('thrust', 'assets/sound/thrust.mp3')
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
        this.physics.add.collider(this.asteroids, this.bullets);
        this.fireSound = this.sound.add('pew')
        this.explosionSound = this.sound.add('explosion')
        this.cursorKeys = this.input.keyboard.createCursorKeys()
        this.wKey = this.input.keyboard.addKey('W')
        this.aKey = this.input.keyboard.addKey('A')
        this.dKey = this.input.keyboard.addKey('D')

        this.reset()
    }

    public update() {
        this.starfield.tilePositionY += 2

        this.player1.update(this.wKey, this.cursorKeys.shift, this.aKey, this.dKey, this.bullets)
        this.player2.update(this.cursorKeys.up, this.cursorKeys.space, this.cursorKeys.left, this.cursorKeys.right, this.bullets)

        if (this.game.getTime() > this.asteroidTime) {
            this.asteroids.spawn()
            this.asteroidTime = this.game.getTime() + 2000
        }
    }

    public reset() {
        this.asteroids.reset()
        this.bullets.reset()
        this.player1.reset()
        this.player2.reset()
    }
}