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
	public attackCooldown = 1000;
	protected attackRefresh = 0;

	public constructor(gameManager: GameManager, x: number, y: number, key?: string, frame?: string) {
		super(gameManager, x, y, key, frame);
		this.body.setSize(this.width, this.height * 0.7, 0, this.height * 0.3);

		this.animations.add('stand.down', [0]);
		this.animations.add('move.down', [1, 2, 3, 4, 5]);
		this.animations.add('kill.down', [6, 7]);
		this.animations.add('dead.down', [8, 9, 10]);
		this.animations.add('stand.right', [11]);
		this.animations.add('move.right', [12, 13, 14, 15, 16]);
		this.animations.add('kill.right', [17, 18]);
		this.animations.add('dead.right', [19, 20, 21]);
		this.animations.add('stand.up', [22]);
		this.animations.add('move.up', [23, 24, 25, 26, 27]);
		this.animations.add('kill.up', [28, 29]);
		this.animations.add('dead.up', [30, 31, 32]);
		this.animations.add('stand.left', [33]);
		this.animations.add('move.left', [34, 35, 36, 37, 38]);
		this.animations.add('kill.left', [39, 40]);
		this.animations.add('dead.left', [41, 42, 43]);
	}

	public get damageStrength() {
		const item = this.inventory.active;
		return item && item instanceof ItemWeapon ? item.damage : this.strength;
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
		const now = Date.now();
		if (now < this.attackRefresh) return;
		this.attackRefresh = Date.now() + this.attackCooldown;
		character.damage(this.damageStrength);
		this.animations.play(`kill.${Direction[this.direction]}`, (this.attackCooldown / 1000) * 2);
	}

	/**
	 * Kill overload to set the character's state
	 */
	public kill() {
		this.setState(CharacterState.dead);
		this.animations.play(`dead.${Direction[this.direction]}`, 1.5);
		this.game.time.events.add(Phaser.Timer.SECOND * 3, () => super.kill());
		return this;
	}

	/**
	 * Sets the state of this character to walk
	 */
	public walk() {
		this.setState(CharacterState.walk);
		this.animations.play(`move.${Direction[this.direction]}`, 5);
		this.updateVelocity(this.walkSpeed);
	}

	/**
	 * Sets the state of this character to run
	 */
	public run() {
		this.setState(CharacterState.run);
		this.animations.play(`move.${Direction[this.direction]}`, 8);
		this.updateVelocity(this.runSpeed);
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

	protected triggerWalk() {
		this.updateVelocity(this.walkSpeed);
	}

	protected updateVelocity(speed: number) {
		switch (this.direction) {
			case Direction.down: this.setVelocity(0, speed); break;
			case Direction.up: this.setVelocity(0, -speed); break;
			case Direction.left: this.setVelocity(-speed, 0); break;
			default: this.setVelocity(speed, 0);
		}
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
