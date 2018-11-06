let height = window.innerHeight;
if(height>783) height=783
let width = window.innerWidth
//if (width>1366*2) width=1366*2

var game = new Phaser.Game(width,height , Phaser.AUTO, '');

game.state.add('Boot', JustRun.Boot);
game.state.add('Preloader', JustRun.Preload);
game.state.add('Game', JustRun.Game);

game.state.start('Boot');