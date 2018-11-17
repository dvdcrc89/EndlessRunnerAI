JustRun.Game = function(){}
JustRun.Game = {

  create: function() {
    this.score = 0;
    this.planeUpgrade;
    this.robotUpgrade;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 0;
      
    this.background = game.add.tileSprite(0, 0, game.width, game.height-23  , 'background');
    this.background.autoScroll(-150, 0);
    this.ground = game.add.tileSprite(0, game.height - 23, game.width, 23, 'ground');
    this.ground.autoScroll(-350, 0);
          
    this.player = this.add.sprite(300, game.height-380, 'player');
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

    //create dog
    this.dog = new Dog(this.game,700, game.height-380, 'dog');
      
   this.hit=0;
   this.upsidedown=false;

      
    let style = { font: "2rem Orbitron", fill: "#F3B326", align: "center" };
    this.scoreText = game.add.text(10, 10, 'Score: '+this.score, style);
    this.timer = game.time.events.loop(300,this.createCoin,this)
   
//    this.timer2 = game.time.events.loop(15000,this.createUpgrade,this)
    this.timer3 = game.time.events.loop(900,this.shootFireball,this)

    this.coinAudio = game.add.audio('coinAudio');
    this.ugradeAudio = game.add.audio('upgradeAudio');
    this.hitAudio = game.add.audio('hitAudio');
    this.transformPlane();
  this.player.anchor.setTo(.5,.5);
//      this.player.scale.y*=-1;
},
  update: function() {
    this.scoreText.destroy();
    let style = { font: "2.5rem Orbitron", fill: "#F3B326", align: "center" };    
    this.scoreText = game.add.text(10, 10, 'Score: '+this.score, style);
    game.physics.arcade.collide(this.player, this.ground);  
    game.physics.arcade.collide(this.dog, this.ground);     
    if(this.dog.body.touching.down)    this.dog.animations.play('run');
    if(this.player.body.touching.down) this.player.animations.play('run');

      

     
     game.physics.arcade.overlap(this.coins, this.player, this.getCoin, null, this);
           game.physics.arcade.overlap(this.coins, this.dog, this.getCoin, null, this);

     game.physics.arcade.overlap(this.fireballs, this.player, this.die, null, this);
     game.physics.arcade.overlap(this.player,this.planeUpgrade,this.transformPlane,null,this);
     game.physics.arcade.overlap(this.player,this.robotUpgrade,this.transormRobot,null,this);
     
//     let timerFireball = 1000-this.score/5;
//     if(timerFireball<500) timerFireball=500;
     this.timer3.delay-=0.01
     this.dog.play();
     if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
          this.dog.isAuto=!this.dog.isAuto;
         console.log(this.dog.isAuto);
     }
      this.autoplayerPlane(this.player,this.next);
  },
    transformPlane: function(){
//        this.planeUpgrade.destroy();
        this.score = this.score + 100;
        x = this.player.x;
        y = this.player.y;
        this.player.destroy(); 
        this.player = this.add.sprite(x, y-30, 'player1');
        this.player.scale.setTo(0.24);
        this.player.animations.add('run');
        this.player.animations.play('run', 18, true);
        game.physics.enable([ this.ground, this.player ], Phaser.Physics.ARCADE)
        this.player.body.collideWorldBounds = true;
//        this.player.body.bounce.set(.8);
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
                this.player.body.allowGravity = false;

        this.playerType = 2;

        game.physics.arcade.gravity.y = 0;
        this.ugradeAudio.play();

    },
    
    transormRobot: function(){
        this.robotUpgrade.destroy();
        this.score= this.score + 50;
        let x= this.player.x;
        let y= this.player.y;
        console.log(x,y);
        this.player.destroy(); 
        this.player = this.add.sprite(x, y-50, 'player2');
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
                        this.player.body.velocity.y = -355;
                        break;
        
    }
    },
    createCoin: function(){
        x=this.game.width+100;   
        y=420-(200*Math.floor(Math.random() * 3));
        coin = this.add.sprite(x, y, 'coin');
        coin.scale.setTo(0.15);
        game.physics.arcade.enableBody(coin);
        coin.body.velocity.x = -350;
        coin.body.allowGravity = false;
        game.physics.enable([coin, this.player ], Phaser.Physics.ARCADE)
        coin.outOfBoundsKill = true;


        this.coins.add(coin);  
    },
    getCoin:function(player,coin){
        if(coin.scale.x>0.1){
            this.score++;
            coin.body.velocity.y= -1050;
            coin.body.velocity.x = -850;
            coin.scale.setTo(0.07);
//            this.coinAudio.play();
        }
        
    },
    createUpgrade: function(){
        let number = Math.floor(Math.random()*10)
        if(number%2 == 0){
            x=this.game.width+100;
            y=this.game.height-152;
            planeUpgrade = this.add.sprite(x, y, 'planeUpgrade');
            game.physics.arcade.enableBody(planeUpgrade);
            planeUpgrade.body.allowGravity = false;
            planeUpgrade.outOfBoundsKill = true;
            planeUpgrade.scale.setTo(0.3);
            planeUpgrade.body.velocity.x = -350
            this.planeUpgrade = planeUpgrade;
        } else {
            x=this.game.width+100;
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
        this.next = num;
        x=this.game.width+100; 
        y=this.game.height -(130 + (this.game.height/5 * num)) ;
        fireball = this.add.sprite(x, y, 'fireball');
        fireball.animations.add('shoot',[0,1,2,3]);
        fireball.animations.play('shoot', 18, true);
        fireball.scale.setTo(0.3);
        game.physics.arcade.enableBody(fireball);
        fireball.body.velocity.x = -900;
        fireball.body.allowGravity = false;
        fireball.outOfBoundsKill = true;
        fireball.lane=num;
        game.physics.enable([fireball, this.player ], Phaser.Physics.ARCADE)
        
        
        this.fireballs.add(fireball);
    
        
    },
     die: function(player,fireball){
         fireball.kill();
         this.hit++;
         console.log(this.hit);
         if (true){
//             this.game.paused = true;
         } else {
             this.hitAudio.play();
             this.transformHuman();
         }
     },
    autoplayerPlane(player,num){
    let chance = Math.floor(Math.random()*500);
        if(chance===99 && !this.upsidedown) {
            console.log("upsidedown")
            this.player.scale.y*=-1;
            this.upsidedown=true;
        }else if(chance<5 && this.upsidedown) {
            this.player.scale.y*=-1;
            this.upsidedown=false;
        }

    let whereIam= 4-Math.floor(player.body.y/ ((this.game.height-200)/5)) ;  
    if(whereIam<0)whereIam=0;    
            
            this.fireballs.children.filter((fireball)=>fireball.body.x - player.body.x >0).map((fireball)=>{

                if (fireball.body.x - player.body.x < 400 && fireball.lane === whereIam  ){
                    if(fireball.lane!=3)
                        n=3
                    else if (fireball.lane > 2) 
                       n = fireball.lane-1;
                    else
                       n = fireball.lane+1
                    
                    setTimeout(this.goToLane(n),1000);
                    
                   }
                    

            })
    
    },
    goToLane(lane){
            
            let y = this.game.height -(130 + (this.game.height/5 * lane))
            if(this.player.body.y ===y) console.log("ciao")
            game.physics.arcade.moveToXY(this.player,300,y,400);
        
           

    }
};
