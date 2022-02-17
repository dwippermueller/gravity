"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = void 0;
var Phaser = require("phaser");
var gameScene_1 = require("./gameScene");
var intro_1 = require("./intro");
var gameOver_1 = require("./gameOver");
var gameConfig = {
    title: 'Sample',
    type: Phaser.AUTO,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [intro_1.IntroScene, gameScene_1.GameScene, gameOver_1.GameOverScene],
    parent: 'game',
    backgroundColor: '#000000',
};
exports.game = new Phaser.Game(gameConfig);
//# sourceMappingURL=main.js.map