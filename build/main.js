"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = void 0;
var Phaser = require("phaser");
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
            debug: true,
        },
    },
    parent: 'game',
    backgroundColor: '#000000',
};
exports.game = new Phaser.Game(gameConfig);
//# sourceMappingURL=main.js.map