let height = window.innerHeight;
if(height>653) height=653
let width = window.innerWidth
if (width>1366) width=1366

var game = new Phaser.Game(width,height , Phaser.AUTO, '');

game.state.add('Boot', JustRun.Boot);
game.state.add('Preloader', JustRun.Preload);
game.state.add('Game', JustRun.Game);

game.state.start('Boot');