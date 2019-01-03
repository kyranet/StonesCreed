// Copyright (c) 2013 appsbu-de. MIT license.
// https://github.com/appsbu-de/phaser_plugin_pathfinding

Phaser.Plugin.PathFinderPlugin = class PathFinderPlugin extends Phaser.Plugin {

	private _easyStar = new EasyStar.js();
	private _grid: number[][] = null;
	private _callback: Phaser.Plugin.EasyStarCallback = null;
	private _prepared = false;
	private _walkables = [0];

	public constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
		super(game, parent);
		if (typeof EasyStar !== 'object') {
			throw new Error('Easystar is not defined!');
		}
	}

	/**
	 * Set Grid for Pathfinding.
	 *
	 * @param grid Mapdata as a two dimensional array.
	 * @param walkables Tiles which are walkable. Every other tile is marked as blocked.
	 * @param iterationsPerCount The amount of iterations per count
	 */
	public setGrid(grid: Phaser.Tile[][], walkables: number[], iterationsPerCount: number = null) {
		this._grid = [];
		for (let i = 0; i < grid.length; i++) {
			this._grid[i] = [];
			for (let j = 0; j < grid[i].length; j++) {
				this._grid[i][j] = grid[i][j] ? grid[i][j].index : 0;
			}
		}
		this._walkables = walkables;

		this._easyStar.setGrid(this._grid);
		this._easyStar.setAcceptableTiles(this._walkables);

		// initiate all walkable tiles with cost 1 so they will be walkable even if they are not on the grid map, jet.
		for (const walkable of walkables) {
			this.setTileCost(walkable, 1);
		}

		if (iterationsPerCount !== null) {
			this._easyStar.setIterationsPerCalculation(iterationsPerCount);
		}
	}

	/**
	 * Sets the tile cost for a particular tile type.
	 *
	 * @param tileType The tile type to set the cost for.
	 * @param cost The multiplicative cost associated with the given tile.
	 */
	public setTileCost(tileType: number, cost: number) {
		this._easyStar.setTileCost(tileType, cost);
	}

	/**
	 * Set callback function (Uh, really?)
	 * @param callback The callback to set
	 */
	public setCallbackFunction(callback: Phaser.Plugin.EasyStarCallback) {
		this._callback = callback;
	}

	/**
	 * Prepare pathcalculation for easystar.
	 *
	 * @param from array 0: x-coords, 1: y-coords ([x,y])
	 * @param to array 0: x-coords, 1: y-coords ([x,y])
	 */
	public preparePathCalculation(from: [number, number], to: [number, number]) {
		if (this._callback === null || typeof this._callback !== 'function') {
			throw new Error('No Callback set!');
		}

		const [startX, startY] = from;
		const [destinationX, destinationY] = to;
		this._easyStar.findPath(startX, startY, destinationX, destinationY, this._callback);
		this._prepared = true;
	}

	/**
	 * Start path calculation.
	 */
	public calculatePath() {
		if (this._prepared === null) {
			throw new Error('no Calculation prepared!');
		}

		this._easyStar.calculate();
	}

};
