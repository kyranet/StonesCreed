import { GameState } from './GameState';

export class PlayState extends GameState {
	public tilemaps: Map<number, Phaser.Tilemap> = new Map();

	public preload() {
		this.game.load.tilemap('Level-0', `json/Level-0.json`, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('overworld', 'images/overworld.png');
		this.game.load.image('cave', 'images/cave.png');
		this.game.load.image('objects', 'images/objects.png');
		this.game.load.spritesheet('player', 'images/player.png', 16, 32);
	}

	public create() {
		this.getTilemap(0);

		this.camera.scale.setTo(3, 3);
		this.game.add.tileSprite(0, 0, 16, 32, 'player');

		// Prevent directions and space key events bubbling up to browser,
		// since these keys will make web page scroll which is not
		// expected.
		this.game.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN,
			Phaser.Keyboard.SPACEBAR
		]);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#99F';
	}

	private getTilemap(level: number) {
		const name = `Level-${level}`;
		let tilemap = this.tilemaps.get(level);
		if (!tilemap) {
			tilemap = this.game.add.tilemap(name);
			tilemap.addTilesetImage('overworld');

			// Background
			tilemap.createLayer(0).smoothed = false;
			// // Decoration
			tilemap.createLayer(1).smoothed = false;
			// // Obstacles
			tilemap.createLayer(2).smoothed = false;
			// this.game.physics.arcade.enable(obstacles);
			// tilemap.setCollisionByExclusion([], true, obstacles);

			this.tilemaps.set(level, tilemap);
		}

		return tilemap;
	}

}
