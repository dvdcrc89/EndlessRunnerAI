
JustRun.Preload = {
  preload: function() {
    this.ready = false;  
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.85)  

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 200, 'preloadbar');    
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('background', 'assets/images/background.png');

          this.load.image('menubg', 'assets/images/menubg.png');

    this.load.spritesheet('pilot', 'assets/images/planefly.png', 449.5, 302,7);
    this.load.spritesheet('bullet', 'assets/images/bullet.png', 110, 70, 1);
    this.load.spritesheet('fireball', 'assets/images/fireball.png', 171, 139, 4);
    // Load a lighter version of Player sprite if on mobile
    if (this.game.device.desktop) 
        this.load.spritesheet('player', 'assets/images/monster.png', 414, 275, 24);
    else  
        this.load.spritesheet('player', 'assets/images/monsterMobile.png', 414, 275, 3);
    
    this.load.image('bomb', 'assets/images/upgrades/bomb.png');
    this.load.image('hpbonus', 'assets/images/upgrades/hpbonus.png');
    this.load.image('robotUpgrade', 'assets/images/robotUpgrade.png');
          this.load.image('button', 'assets/images/button.png');


    this.load.audio('upgradeAudio','assets/audio/upgrade.wav')
    this.load.audio('hitAudio','assets/audio/hit.wav')
    this.load.audio('hitPlane','assets/audio/hitPlane.wav')
    this.load.audio('directHit','assets/audio/directHit.wav')
    this.load.audio('combo','assets/audio/combo.mp3')

    this.load.audio('soundtrack','assets/audio/soundtrack.mp3')
    this.load.audio('randomSounds','assets/audio/random.wav')

  


    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
  }, 
  update: function() {
    if(this.ready === true) {
      this.state.start('MainMenu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};