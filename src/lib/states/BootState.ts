import { PathFinderPlugin } from '../plugins/PathFinderPlugin';
import { LOADING_POSITION, WIN_WIDTH } from '../util/constants';
import { GameState } from './GameState';

export class BootState extends GameState {

	private loadingBar: Phaser.Graphics = null;

	public preload() {
		this.loadingBar = this.game.add.graphics(LOADING_POSITION.x, LOADING_POSITION.y);
		this.loadingBar.beginFill(0xFFFFFF);

		this.game.load.onFileComplete.add((progress: number) => {
			this.loadingBar.drawRect(0, 0, (progress / 100) * WIN_WIDTH, 5);
		});

		this.game.load.onLoadComplete.add(() => {
			this.loadingBar.endFill();
		});

		this.game.load.spritesheet('player', 'images/player.png', 48, 96);
		this.game.load.spritesheet('enemy', 'images/enemy.png', 48, 96);
		this.game.load.spritesheet('objects', 'images/objects.png', 48, 48);
		this.game.load.tilemap('Level-0', 'json/Level-0.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('overworld', 'images/overworld.png');
		this.game.load.image('cave', 'images/cave.png');
		this.game.load.image('logo', 'images/StonesCreed.png');
	}

	public create() {
		this.game.pathFinder = this.game.plugins.add(PathFinderPlugin);
		this.game.state.start('menu');
	}

	public shutdown(game: Phaser.Game) {
		if (this.loadingBar) {
			this.loadingBar.destroy(true);
			this.loadingBar = null;
		}
		super.shutdown(game);
	}

}
