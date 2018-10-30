JustRun.Game = {

  create: function() {
    this.coinTimer=10;    
    this.jumpesN = 0;
    this.score = 0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 400;
      
    this.background = game.add.tileSprite(0, 0, game.width, game.height-73  , 'background');
    this.background.autoScroll(-100, 0);
    this.ground = game.add.tileSprite(0, game.height - 73, game.width, 73, 'ground');
    this.ground.autoScroll(-400, 0);
          
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
    let style = { font: "2rem Arial", fill: "#ff0044", align: "center" };
    this.scoreText = game.add.text(10, 10, 'Score: '+this.score, style);
    this.timer = game.time.events.loop(200,this.createCoin,this)
    this.planeUpgrade;
    this.timer2 = game.time.events.loop(20000,this.createUpgrade,this)
  
  
    

},
  update: function() {
    this.scoreText.destroy();
    let style = { font: "2rem Arial", fill: "#ff0044", align: "center" };
    this.scoreText = game.add.text(10, 10, 'Score: '+this.score, style);
  
    game.physics.arcade.collide(this.player, this.ground);
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.transormRobot()
         console.log(this.playerType)

    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.transormHuman()
        console.log(this.playerType)

    }
         
      if(this.player.body.touching.down){
          this.player.animations.play('run');
          this.jumpesN = 0;
      } 
       if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          this.jump();

          }
     
     
     game.physics.arcade.overlap(this.coins, this.player, this.getCoin, null, this);
   
     game.physics.arcade.overlap(this.player,this.planeUpgrade,this.transformPlane,null,this);
   



  },
    transformPlane: function(){
        this.planeUpgrade.destroy();
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
        this.background.autoScroll(-400, 0);
        this.ground.autoScroll(-600, 0);
        this.playerType = 2;

//        game.physics.arcade.gravity.y = 550;

    },
    
    transormRobot: function(){
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
        this.background.autoScroll(-300, 0);
        this.ground.autoScroll(-500, 0);
        this.playerType = 1;

        game.physics.arcade.gravity.y = 400;

    },
    
    transormHuman: function(){
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
        this.ground.body.allowGravity = false;
        this.background.autoScroll(-100, 0);
        this.ground.autoScroll(-400, 0);
        this.playerType = 0;

        game.physics.arcade.gravity.y = 400;

    },
    jump: function(){
        switch(this.playerType){
            case 0:        
                    if(this.player.body.touching.down){
                        this.player.animations.add('jump',[14,15,16,17,18,19,20,21,22,23]);
                        this.player.animations.play('jump');
                        this.player.body.velocity.y = -280;

                        }
                        break;
            case 1:  
                    if(this.player.body.touching.down){
                        
                        this.player.animations.add('jump',[10,11,12,13,14,15,16,17,18,19]);
                        this.player.animations.play('jump');
                        this.player.body.velocity.y = -400;
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
        
	    game.physics.arcade.overlap(this.player,coin,this.test);


        this.coins.add(coin);  
    },
    getCoin:function(player,coin){
        this.score++;
        console.log(this.score);
        coin.kill();
    },
    createUpgrade: function(){
        if(this.playerType != 2){
            x=1200;
            y=this.game.height-152;
            planeUpgrade = this.add.sprite(x, y, 'planeUpgrade');
            game.physics.arcade.enableBody(planeUpgrade);
            planeUpgrade.body.allowGravity = false;
            planeUpgrade.outOfBoundsKill = true;
            planeUpgrade.scale.setTo(0.3);
            planeUpgrade.body.velocity.x = -350
            this.planeUpgrade = planeUpgrade;
        }
    
    }
};
