import { GameManager } from '../structures/managers/GameManager';
import { GameState } from './GameState';

export class PlayState extends GameState {

	public gameManager: GameManager = null;
	public tilemaps: Map<number, Phaser.Tilemap> = new Map();
	public obstacleLayer: Phaser.TilemapLayer = null;
	protected events: Map<string, Function> = new Map();
	private escListener: (event: KeyboardEvent) => void = null;

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

		this.gameManager = new GameManager(this);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#000';
		super.create();

		const onPause = () => {
			this.world.setAllChildren('tint', 0x7A7A7A);
		};
		const onResume = () => {
			this.world.setAllChildren('tint', 0xFFFFFF);
		};
		this.events.set('onPause', onPause);
		this.events.set('onResume', onResume);
		this.game.onPause.add(onPause);
		this.game.onResume.add(onResume);

		this.escListener = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				this.game.paused = !this.game.paused;
			}
		};
		document.addEventListener('keydown', this.escListener);

		// Set up the path finder
		this.game.pathFinder.setGrid(this.obstacleLayer.layer.data, [-1]);
	}

	public shutdown() {
		// Clean up everything to avoid memory leaks
		document.removeEventListener('keydown', this.escListener);
		this.escListener = null;
		this.game.onPause.remove(this.events.get('onPause'));
		this.game.onResume.remove(this.events.get('onResume'));
		this.events.clear();
		super.shutdown(this.game);
	}

	public update() {
		super.update(this.game);

		if (!this.game.paused) {
			this.game.physics.arcade.collide(this.gameManager.gameObjectsGroup, this.obstacleLayer);
			this.gameManager.update();
		}
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
			const decoration = tilemap.createLayer(1);
			decoration.smoothed = false;
			// // Obstacles
			this.obstacleLayer = tilemap.createLayer(2);
			this.obstacleLayer.smoothed = false;
			this.game.physics.arcade.enable(this.obstacleLayer);
			tilemap.setCollisionByExclusion([], true, this.obstacleLayer);

			this.tilemaps.set(level, tilemap);
		}

		return tilemap;
	}

}
