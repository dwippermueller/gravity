import { BulletGroup } from "./bulletGroup";
import * as Phaser from "phaser";
import { Player } from "./player";
import {AsteroidGroup} from "./asteroidGroup";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private player1: Player
    private player2: Player
    private starfield: Phaser.GameObjects.TileSprite
    private bullets: BulletGroup
    private asteroids: AsteroidGroup
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
    }

    public create() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        this.starfield = this.add.tileSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight, 'starfield')
        this.player1 = new Player(this, 'starship1', 1, 200, 400)
        this.player2 = new Player(this, 'starship2', 2, 600, 400)
        this.bullets = new BulletGroup(this)
        this.asteroids = new AsteroidGroup(this)

        this.physics.add.collider(this.player1.sprite, this.bullets);
        this.physics.add.collider(this.player2.sprite, this.bullets);

        this.physics.add.collider(this.player1.sprite, this.asteroids, hit);
        this.physics.add.collider(this.player2.sprite, this.asteroids, hit);

        function hit (player, asteroid)
        {
            player.disableBody(true, true);
            asteroid.disableBody(true, true);
        }
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

}