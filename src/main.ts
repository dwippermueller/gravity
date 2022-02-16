import * as Phaser from 'phaser'
import { GameScene } from './gameScene';

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
 
  scene: GameScene,
  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig)