var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', JustRun.Boot);
game.state.add('Preloader', JustRun.Preload);
game.state.add('Game', JustRun.Game);

game.state.start('Boot');