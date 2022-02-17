import * as Phaser from 'phaser'
import { GameScene } from './gameScene';
import { IntroScene } from './intro';
import {GameOverScene} from "./gameOver";

const gameConfig: Phaser.Types.Core.GameConfig = {
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
 
  scene: [IntroScene, GameScene, GameOverScene],
  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig)