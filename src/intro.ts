const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Intro',
};

export class IntroScene extends Phaser.Scene {
    private starfield: Phaser.GameObjects.TileSprite
    
    constructor() {
        super(sceneConfig);
    }

    public preload() {
        this.load.image('starfield', 'assets/starfield.png')
    }

    public update() {
        this.starfield.tilePositionY += 2
    }
}
