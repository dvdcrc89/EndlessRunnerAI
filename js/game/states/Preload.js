
JustRun.Preload = {
  preload: function() {
    this.ready = false;  
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.85)  

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');    
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('background', 'assets/images/background.png');


    this.load.spritesheet('player', 'assets/images/cowboy.png', 423.6, 510,33);
    this.load.spritesheet('player2', 'assets/images/robot.png', 572, 556,28);
    this.load.spritesheet('player1', 'assets/images/planefly.png', 449, 302, 2);
    this.load.image('coin', 'assets/images/coin.png');


    this.load.audio('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);


    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
  }, 
  update: function() {
    if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
      this.state.start('Game');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};