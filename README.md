# Stone's Creed <img src="src/images/StonesCreed.png" align="right" width="30%">

Awesome game by
[kyranet](https://github.com/kyranet) and [CarlosMGM](https://github.com/CarlosMGM).

What would happen if Assassin's Creed were based in the stone age?
We shall discover it with this game based on Phaser.js!

## Installation

Clone this repository and install dependencies:

```
git clone kyranet/CreedStones
cd CreedStones
npm install
```

To **build** the game, run the `dist` task from the project root:

```
npx gulp dist
```

The `dist` folder will contain a build of the game. You can then start a local server that serves this directory statically to play the game in local:

```
npx http-server dist
```

You can **clean up** the temporary files and the `dist` folder by running:

```
npx gulp clean
```

## Development

This project uses [Browserify](http://browserify.org) to handle JavaScript modules.

There is a task that will automatically run Browserify when a JavaScript file changes, and it will also reload the browser.

```
npx gulp run
```

You can deploy to **Github Pages** with the `deploy:ghpages` task, which will build the project and then push the `dist` folder in the `gh-pages` branch.

```
npx gulp deploy:ghpages
```
