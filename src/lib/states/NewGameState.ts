import { readLine } from '../util/util';
import { GameState } from './GameState';

export class NewGameState extends GameState {

	public preload() {
		this.game.load.json('Level-0-GameObjects', 'json/Level-0-GameObjects.json');
	}

	public create() {
		const titleText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 65, 'Insert your name',
			{ font: '65px Arial', fill: '#CDCDCD', align: 'center' });
		titleText.anchor.setTo(0.5, 0.5);

		const inputText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '',
			{ font: '65px Arial', fill: '#CDCDCD', align: 'center' });
		inputText.anchor.setTo(0.5, 0.5);
		inputText.alignTo(titleText, Phaser.BOTTOM_CENTER, 0, 25);

		readLine(inputText, (name) => {
			titleText.destroy(true);
			inputText.destroy(true);
			this.game.state.start('play');
			const gameManager = GameState.gameManager;
			gameManager.playerName = name;
			gameManager.pendingOnCreate.push(() => {
				console.log('Loading New Game...');
				gameManager.storageManager.loadGameObjects(this.game.cache.getJSON('Level-0-GameObjects'));
				console.log('Loaded!');
			});
		}, { maximumLength: 20 });
	}

}
