JustRun.Game = {

  create: function() {
    this.jumpesN = 0;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 250;
      
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height-73  , 'background');
    this.background.autoScroll(-100, 0);
    this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
    this.ground.autoScroll(-400, 0);
      
    this.player = this.add.sprite(300, this.game.height-380, 'player');
    this.player.anchor.setTo();
    this.player.scale.setTo(0.20);
    this.player.animations.add('run',[24,25,26,27,28,29,30,31,32,33]);
  
    this.player.animations.play('run', 18, true);
    this.playerType = 0;  
 
    this.game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.ground.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
   

    this.scoreText = this.game.add.bitmapText(10,10, 'minecraftia', 'Score: 0', 24);
},
  update: function() {
      
    this.game.physics.arcade.collide(this.player, this.ground);

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.transformPlane()
        console.log(this.playerType)
    }
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
       if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          this.jump();
          }
      



  },
    transformPlane: function(){
        
        x = this.player.x;
        y = this.player.y;
        console.log(x,y);
        this.player.destroy(); 
        this.player = this.add.sprite(x, y, 'player1');
        this.player.scale.setTo(0.35);
        this.player.animations.add('run');
        this.player.animations.play('run', 18, true);
        this.game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE)
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(.8);
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.background.autoScroll(-400, 0);
        this.ground.autoScroll(-600, 0);
        this.playerType = 2;
        this.game.physics.arcade.gravity.y = 550;

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
        this.game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.background.autoScroll(-300, 0);
        this.ground.autoScroll(-500, 0);
        this.playerType = 1;
        this.game.physics.arcade.gravity.y = 250;

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
        this.game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.background.autoScroll(-100, 0);
        this.ground.autoScroll(-400, 0);
        this.playerType = 0;
        this.game.physics.arcade.gravity.y = 250;

    },
    jump: function(){
        switch(this.playerType){
            case 0:        
                    if(this.player.body.touching.down){
                        this.player.animations.add('jump',[14,15,16,17,18,19,20,21,22,23]);
                        this.player.animations.play('jump');
                        this.player.body.velocity.y = -250;
                        }
                        break;
            case 1:  
                    if(this.player.body.touching.down){
                        
                        this.player.animations.add('jump',[10,11,12,13,14,15,16,17,18,19]);
                        this.player.animations.play('jump');
                        this.player.body.velocity.y = -350;
                        this.jumpesN++;
                        }
                        break;
                
            case 2:    
                        this.player.body.velocity.y = -255;
                        break;
        
    }
    }
};
