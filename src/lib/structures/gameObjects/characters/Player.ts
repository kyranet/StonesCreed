import { GameManager } from '../../managers/GameManager';
import { Direction, HidingType, PlayerState } from '../../misc/types';
import { HidingSpot, IHidingSpotSerialized } from '../hidingSpots/HidingSpot';
import { Character, ICharacterSerialized } from './Character';

export class Player extends Character {

	public hidingSpot: HidingSpot = null;
	private readonly directions = {
		down: false,
		left: false,
		right: false,
		up: false
	};
	private readonly cursorKeys: Phaser.CursorKeys = this.game.input.keyboard.createCursorKeys();
	private readonly actions = {
		interact: false,
		kill: false
	};
	private movementRefresh = 0;

	public constructor(gameManager: GameManager, x: number, y: number, key?: string, frame?: number) {
		super(gameManager, x, y, key, frame);
		this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		this.body.immovable = false;
	}

	public update() {
		super.update();
		if (Date.now() < this.movementRefresh) return;

		this.directions.down = this.cursorKeys.down.isDown;
		this.directions.left = this.cursorKeys.left.isDown;
		this.directions.right = this.cursorKeys.right.isDown;
		this.directions.up = this.cursorKeys.up.isDown;

		const keyboard = this.gameManager.game.input.keyboard;
		const running = keyboard.isDown(Phaser.Keyboard.SHIFT);

		if (this.directions.down !== this.directions.up) {
			this.setDirection(this.directions.down ? Direction.down : Direction.up);
			if (running) this.setState(PlayerState.run).run();
			else this.setState(PlayerState.walk).walk();
		} else if (this.directions.left !== this.directions.right) {
			this.setDirection(this.directions.left ? Direction.left : Direction.right);
			if (running) this.setState(PlayerState.run).run();
			else this.setState(PlayerState.walk).walk();
		} else {
			this.stand().setState(PlayerState.stand);
		}

		if (keyboard.isDown(Phaser.Keyboard.X)) {
			this.actions.interact = false;
			this.actions.kill = true;
			this.triggerWalk();
		} else if (keyboard.isDown(Phaser.Keyboard.Z)) {
			this.actions.interact = true;
			this.actions.kill = false;
			this.triggerWalk();
		} else if (keyboard.isDown(Phaser.Keyboard.S)) {
			this.gameManager.storage.save();
		} else {
			this.actions.interact = false;
			this.actions.kill = false;
		}
	}

	public attack(character: Character) {
		super.attack(character);
		character.kill();
		this.movementRefresh = this.attackRefresh;
		return this;
	}

	public collides(gameObject: Character) {
		if (this.actions.kill) this.attack(gameObject);
		else if (this.actions.interact) gameObject.interact(this);
		return true;
	}

	/**
	 * Hides the player, changing the state and setting the hiding spot
	 * @param hidingSpot The hiding spot
	 */
	public hide(hidingSpot: HidingSpot) {
		if (hidingSpot.hidingType !== HidingType.none) {
			this.setState(PlayerState.hidden);
			this.hidingSpot = hidingSpot;
		}
		return this;
	}

	/**
	 * Reveals the player, leaving the hiding place if there was any
	 */
	public reveal() {
		if (this.hidingSpot) {
			this.setState(this.health ? PlayerState.stand : PlayerState.dead);
			this.hidingSpot = null;
		}
		return this;
	}

	public fromJSON(data: IPlayerSerialized) {
		super.fromJSON(data);
		return this;
	}

	public toJSON(): IPlayerSerialized {
		return {
			...super.toJSON(),
			hidingSpot: this.hidingSpot ? this.hidingSpot.toJSON() : null,
			type: 'Player'
		};
	}

}

/**
 * The serialized player data
 */
export interface IPlayerSerialized extends ICharacterSerialized {
	hidingSpot: IHidingSpotSerialized;
}
