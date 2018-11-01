JustRun.Game = {

  create: function() {
    this.coinTimer=10;    
    this.jumpesN = 0;
    this.score = 0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 3400;
      
//    this.background = game.add.tileSprite(0, 0, game.width, game.height-73  , 'background');
//    this.background.autoScroll(-400, 0);
    this.ground = game.add.tileSprite(0, game.height - 73, game.width, 73, 'ground');
    this.ground.autoScroll(-600, 0);
          
    this.player = this.add.sprite(300, game.height-380, 'player');
    this.player.anchor.setTo();
    this.player.scale.setTo(0.20);
    this.player.animations.add('run',[24,25,26,27,28,29,30,31,32,33]);
  
    this.player.animations.play('run', 18, true);
    this.playerType = 0;  
 
    game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.ground.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    this.coins =  game.add.group();
    this.fireballs =  game.add.group();

    let style = { font: "2rem Arial", fill: "#ff0044", align: "center" };
    this.scoreText = game.add.text(10, 10, 'Score: '+this.score, style);
    this.timer = game.time.events.loop(200,this.createCoin,this)
    this.planeUpgrade;
    this.robotUpgrade;
    this.timer2 = game.time.events.loop(5000,this.createUpgrade,this)
    this.timer3 = game.time.events.loop(1000,this.shootFireball,this)

    this.coinAudio = game.add.audio('coinAudio');
        this.ugradeAudio = game.add.audio('upgradeAudio');
    this.hitAudio = game.add.audio('hitAudio');



},
  update: function() {
    this.scoreText.destroy();
    let style = { font: "2rem Arial", fill: "#ff0044", align: "center" };
    this.scoreText = game.add.text(10, 10, 'Score: '+this.score, style);
  
    game.physics.arcade.collide(this.player, this.ground);
    
 
         
      if(this.player.body.touching.down){
          this.player.animations.play('run');
          this.jumpesN = 0;
      } 
       if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          this.jump();

          }
     
     
     game.physics.arcade.overlap(this.coins, this.player, this.getCoin, null, this);
     game.physics.arcade.overlap(this.fireballs, this.player, this.die, null, this);
     game.physics.arcade.overlap(this.player,this.planeUpgrade,this.transformPlane,null,this);
     game.physics.arcade.overlap(this.player,this.robotUpgrade,this.transormRobot,null,this);
     let timerFireball = 1000-this.score/10;
     if(timerFireball<400) timerFireball=400;
     this.timer3.delay=timerFireball


  },
    transformPlane: function(){
        this.planeUpgrade.destroy();
        this.score= this.score + 70;
        x = this.player.x;
        y = this.player.y;
        console.log(x,y);
        this.player.destroy(); 
        this.player = this.add.sprite(x, y, 'player1');
        this.player.scale.setTo(0.35);
        this.player.animations.add('run');
        this.player.animations.play('run', 18, true);
        game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE)
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(.8);
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
    
        this.playerType = 2;

        game.physics.arcade.gravity.y = 850;
        this.ugradeAudio.play();

    },
    
    transormRobot: function(){
        this.robotUpgrade.destroy();
        this.score= this.score + 50;
        let x= this.player.x;
        let y= this.player.y;
        console.log(x,y);
        this.player.destroy(); 
        this.player = this.add.sprite(x, y-30, 'player2');
        this.player.scale.setTo(0.24);
        this.player.animations.add('run',[20,21,22,23,24,25,26,27]);
        this.player.animations.play('run', 18, true);
        game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.playerType = 1;

        game.physics.arcade.gravity.y = 3400;
        this.ugradeAudio.play();
    },
    
    transformHuman: function(){
        let x= this.player.x;
        let y= this.player.y;
        console.log(x,y);
        this.player.destroy(); 
        this.player = this.add.sprite(x, y, 'player');
        this.player.scale.setTo(0.20);
        this.player.animations.add('run',[24,25,26,27,28,29,30,31,32,33]);
        this.player.animations.play('run', 18, true);
        game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false
        this.playerType = 0;

        game.physics.arcade.gravity.y = 3400;

    },
    jump: function(){
        switch(this.playerType){
            case 0:        
                    if(this.player.body.touching.down){
                        this.player.animations.add('jump',[14,15,16,17,18,19,20,21,22,23]);
                        this.player.animations.play('jump');
                        this.player.body.velocity.y = -1080;

                        }
                        break;
            case 1:  
                    if(this.player.body.touching.down){
                        
                        this.player.animations.add('jump',[10,11,12,13,14,15,16,17,18,19]);
                        this.player.animations.play('jump');
                        this.player.body.velocity.y = -1400;
                        this.jumpesN++;
                        }
                        break;
                
            case 2:    
                        this.player.body.velocity.y = -255;
                        break;
        
    }
    },
    createCoin: function(){
        x=1200;   
        y=420-(200*Math.floor(Math.random() * 3));
        coin = this.add.sprite(x, y, 'coin');
        coin.scale.setTo(0.2);
        game.physics.arcade.enableBody(coin);
        coin.body.velocity.x = -350;
        coin.body.allowGravity = false;
        game.physics.enable([coin, this.player ], Phaser.Physics.ARCADE)

        this.coins.add(coin);  
    },
    getCoin:function(player,coin){
        this.score++;
        coin.body.velocity.y= -1050;
        coin.body.velocity.x = -850;
        coin.scale.setTo(0.1);
        this.coinAudio.play();
        
    },
    createUpgrade: function(){
        let number = Math.floor(Math.random()*10)
        if(number%2 == 0){
            x=1200;
            y=this.game.height-152;
            planeUpgrade = this.add.sprite(x, y, 'planeUpgrade');
            game.physics.arcade.enableBody(planeUpgrade);
            planeUpgrade.body.allowGravity = false;
            planeUpgrade.outOfBoundsKill = true;
            planeUpgrade.scale.setTo(0.3);
            planeUpgrade.body.velocity.x = -350
            this.planeUpgrade = planeUpgrade;
        } else {
            x=1200;
            y=this.game.height-170;
            robotUpgrade = this.add.sprite(x, y, 'robotUpgrade');
            game.physics.arcade.enableBody(robotUpgrade);
            robotUpgrade.body.allowGravity = false;
            robotUpgrade.outOfBoundsKill = true;
            robotUpgrade.scale.setTo(0.3);
            robotUpgrade.body.velocity.x = -350
            this.robotUpgrade = robotUpgrade;
            
        }
    
    },
    shootFireball: function(){
        
        let num = Math.floor(Math.random() * 5)
        x=1200;   
        y=this.game.height -(130 + (130 * num)) ;
        fireball = this.add.sprite(x, y, 'fireball');
        fireball.animations.add('shoot',[0,1,2,3]);
        fireball.animations.play('shoot', 18, true);
        fireball.scale.setTo(0.3);
        game.physics.arcade.enableBody(fireball);
        fireball.body.velocity.x = -550;
        fireball.body.allowGravity = false;
        fireball.outOfBoundsKill = true;

        game.physics.enable([fireball, this.player ], Phaser.Physics.ARCADE)
        

        this.fireballs.add(fireball);
    
        
    },
     die: function(player,fireball){
         fireball.kill();
         if (this.playerType==0){
             this.game.paused = true;
         } else {
             this.hitAudio.play();
             this.transformHuman();
         }
     }
};
