declare namespace Phaser {

	namespace Plugin {
		export class PathFinderPlugin extends Phaser.Plugin {
			public constructor(game: Phaser.Game, parent: Phaser.PluginManager);
			public setGrid(grid: Phaser.Tile[][], walkables: number[], iterationsPerCount?: number): void;
			public setTileCost(tileType: number, cost: number): void;
			public setCallbackFunction(callback: EasyStarCallback): void;
			public preparePathCalculation(from: [number, number], to: [number, number]): void;
			public calculatePath(): void;
		}

		interface EasyStarPath extends Array<{
			x: number;
			y: number;
		}> { }

		interface EasyStarCallback {
			(path: EasyStarPath): void;
		}
	}

	interface Game {
		pathFinder: Plugin.PathFinderPlugin;
	}

}
