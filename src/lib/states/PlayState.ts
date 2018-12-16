import { GameState } from './GameState';

export class PlayState extends GameState {
	public tilemaps: Map<number, Phaser.Tilemap> = new Map();
	public obstacleLayer: Phaser.TilemapLayer = null;

	public preload() {
		super.preload();
		this.game.load.tilemap('Level-0', `json/Level-0.json`, null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('overworld', 'images/overworld.png');
		this.game.load.image('cave', 'images/cave.png');
		this.game.load.image('objects', 'images/objects.png');
	}

	public create() {
		this.getTilemap(0);

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
		super.create();
		console.log(this);
	}

	public update() {
		this.game.physics.arcade.collide(GameState.gameManager.player, this.obstacleLayer);
	}

	protected getTilemap(level: number) {
		const name = `Level-${level}`;
		let tilemap = this.tilemaps.get(level);
		if (!tilemap) {
			tilemap = this.game.add.tilemap(name);
			tilemap.addTilesetImage('overworld');

			// Background
			const background = tilemap.createLayer(0);
			background.smoothed = false;
			background.resizeWorld();
			// // Decoration
			tilemap.createLayer(1).smoothed = false;
			// // Obstacles
			this.obstacleLayer = tilemap.createLayer(2);
			this.obstacleLayer.smoothed = false;
			this.game.physics.arcade.enable(this.obstacleLayer);
			tilemap.setCollisionByExclusion([], true, this.obstacleLayer);
			// GameState.gameManager.obstaclesGroup.add(obstacles);
			// this.game.physics.arcade.enable(obstacles);
			// tilemap.setCollisionByExclusion([], true, obstacles);

			this.tilemaps.set(level, tilemap);
		}

		return tilemap;
	}

}
