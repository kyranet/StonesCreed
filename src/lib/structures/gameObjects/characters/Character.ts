import { IInventorySerialized, Inventory } from '../../common/Inventory';
import { Item } from '../../items/Item';
import { ItemWeapon } from '../../items/ItemWeapon';
import { GameManager } from '../../managers/GameManager';
import { CharacterState, Direction } from '../../misc/types';
import { GameObject, IGameObjectSerialized } from '../GameObject';

export class Character extends GameObject {
	public walkSpeed = 0;
	public runSpeed = 0;
	public state: number = CharacterState.stand;
	public direction = Direction.down;
	public inventory = new Inventory();
	public strength = 0;

	public constructor(gameManager: GameManager, x: number, y: number, key?: string, frame?: string) {
		super(gameManager, x, y, key, frame);
		this.body.setSize(this.width, this.height * 0.7, 0, this.height * 0.3);

		// TODO(kyranet): Update the codes once the sprites are finished
		this.animations.add('stand.down', [0]);
		this.animations.add('move.down', [1, 2, 3, 4, 5]);
		this.animations.add('kill.down', [6, 7]);
		this.animations.add('stand.right', [8]);
		this.animations.add('move.right', [9, 10, 11, 12, 13]);
		this.animations.add('kill.right', [14, 15]);
		this.animations.add('stand.up', [16]);
		this.animations.add('move.up', [17, 18, 19, 20, 21]);
		this.animations.add('kill.up', [22, 23]);
		this.animations.add('stand.left', [24]);
		this.animations.add('move.left', [25, 26, 27, 28, 29]);
		this.animations.add('kill.left', [30, 31]);
	}

	public get damageStrength() {
		const item = this.inventory.active;
		return item instanceof ItemWeapon ? item.damage : this.strength;
	}

	public setStrength(strength: number) {
		this.strength = strength;
		return this;
	}

	public setState(state: number) {
		this.state = state;
		return this;
	}

	/**
	 * Try to attack a character
	 * @param character The character this one is attempting to attack
	 */
	public attack(character: Character) {
		character.damage(this.damageStrength);
		this.animations.play(`kill.${Direction[this.direction]}`, 2);
	}

	/**
	 * Kill overload to set the character's state
	 */
	public kill() {
		this.setState(CharacterState.dead);
		return super.kill();
	}

	/**
	 * Sets the state of this character to walk
	 */
	public walk() {
		this.setState(CharacterState.walk);
		this.animations.play(`move.${Direction[this.direction]}`, 5);
		switch (this.direction) {
			case Direction.down: this.setVelocity(0, this.walkSpeed); break;
			case Direction.up: this.setVelocity(0, -this.walkSpeed); break;
			case Direction.left: this.setVelocity(-this.walkSpeed, 0); break;
			default: this.setVelocity(this.walkSpeed, 0);
		}
	}

	/**
	 * Sets the state of this character to run
	 */
	public run() {
		this.setState(CharacterState.run);
		this.animations.play(`move.${Direction[this.direction]}`, 8);
		switch (this.direction) {
			case Direction.down: this.setVelocity(0, this.runSpeed); break;
			case Direction.up: this.setVelocity(0, -this.runSpeed); break;
			case Direction.left: this.setVelocity(-this.runSpeed, 0); break;
			default: this.setVelocity(this.runSpeed, 0);
		}
	}

	/**
	 * Sets the state of this character to stand, changing
	 */
	public stand() {
		this.setState(CharacterState.stand);
		this.animations.play(`stand.${Direction[this.direction]}`, 0);
		this.animations.stop();
		this.setVelocity(0, 0);
	}

	/**
	 * Change the direction for this character
	 * @param direction The new direction
	 */
	public changeDirection(direction: Direction) {
		this.direction = direction;
	}

	public fromJSON(data: ICharacterSerialized) {
		super.fromJSON(data);
		this.direction = data.direction;
		this.runSpeed = data.runSpeed;
		this.walkSpeed = data.walkSpeed;
		this.inventory.clear();
		for (const entry of data.inventory.items) this.inventory.set(entry.name, new Item(this.gameManager.game, entry.name));
		this.setStrength(data.strength);
		return this;
	}

	public toJSON(): ICharacterSerialized {
		return {
			...super.toJSON(),
			direction: this.direction,
			inventory: this.inventory.toJSON(),
			runSpeed: this.runSpeed,
			strength: this.strength,
			walkSpeed: this.walkSpeed,
		};
	}

}

/**
 * The serialized character data
 */
export interface ICharacterSerialized extends IGameObjectSerialized {
	direction: number;
	inventory: IInventorySerialized;
	runSpeed: number;
	strength: number;
	walkSpeed: number;
}
