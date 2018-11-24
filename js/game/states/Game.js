JustRun.Game = function() {}
JustRun.Game = {

    create: function() {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
       
        this.background = game.add.tileSprite(0, 0, game.width, game.height - 1, 'background');
        this.background.autoScroll(-350, 0);
        this.ground = game.add.tileSprite(0, game.height - 1, game.width, 1, 'ground');
        this.ground.autoScroll(-750, 0); 
         this.coins = game.add.group();
         this.players = game.add.group();
        this.fireballs = game.add.group();
        this.players.add(new Pilot(this.game, 0, game.height - 50,true, 'pilot',this.fireballs));
        this.players.add(new Pilot(this.game, 0, game.height - 250,true, 'pilot',this.fireballs));
        this.players.add(new Pilot(this.game, 0, game.height - 450,true, 'pilot',this.fireballs));
        this.players.add(new Pilot(this.game, 0, game.height - 850,true, 'pilot',this.fireballs));
        this.messages= game.add.group()
                this.dead =game.add.group();

        game.physics.enable([this.ground, this.players], Phaser.Physics.ARCADE)
                game.physics.enable(this.dead, Phaser.Physics.ARCADE)

        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.monster = new Monster(this.game, this.game.width-100, game.height, 'monster',this.players)
        this.youCanShot=true;
        this.combo=0;       
        
        this.hit = 0;
        this.firenum=0;

   

            this.timer2 = game.time.events.loop(2000,()=>{
                    if(this.players.length<10000){
            this.players.add(new Pilot(this.game, 0, (game.height - Math.random()*300),true, 'pilot',this.fireballs))
        }
            },this)
        this.timer3 = game.time.events.loop(450, ()=>this.youCanShot=true, this)
        this.timer4 = game.time.events.loop(4000, ()=>this.messages.children.map(t=>t.destroy()),true, this)
        this.timer5 = game.time.events.loop(1000, ()=>this.combo=0, this)


        this.coinAudio = game.add.audio('coinAudio');
        this.ugradeAudio = game.add.audio('upgradeAudio');
        this.hitAudio = game.add.audio('hitAudio');
        console.log(this.dog,this.player);
    },
    update: function() {

        this.fireballs.children.filter((fireball)=>fireball.x<0).map((fireball)=>fireball.destroy());
        game.physics.arcade.collide(this.players, this.ground);
        game.physics.arcade.collide(this.dog, this.ground);
        
        this.players.children.map(player=>player.play());
        this.monster.play();
        
        
//        
//        this.scoreText.destroy();
//        let style = {
//            font: "2.5rem Orbitron",
//            fill: "#F3B326",
//            align: "center"
//        };
//        this.scoreText = game.add.text(10, 10, 'Enemy score: ' + this.score, style);
     
//        if (this.dog.body.touching.down) this.dog.animations.play('run');




        game.physics.arcade.overlap(this.coins, this.players, this.getCoin, null, this);
        game.physics.arcade.overlap(this.coins, this.dog, this.getCoin, null, this);
        game.physics.arcade.overlap(this.fireballs, this.players, this.die, null, this);

//        game.physics.arcade.overlap(this.fireballs, this.dog, this.die, null, this);




    },
    createCoin: function() {
        x = this.game.width + 100;
        y = 420 - (200 * Math.floor(Math.random() * 3));
        coin = this.add.sprite(x, y, 'coin');
        coin.scale.setTo(0.15);
        game.physics.arcade.enableBody(coin);
        coin.body.velocity.x = -350;
        coin.body.allowGravity = false;
        game.physics.enable([coin, this.players], Phaser.Physics.ARCADE)
        coin.outOfBoundsKill = true;


        this.coins.add(coin);
    },
    getCoin: function(coin, player) {
        if (coin.scale.x > 0.1) {
            this.score++;
            coin.body.velocity.y = -1050;
            coin.body.velocity.x = -850;
            coin.scale.setTo(0.07);
            //            this.coinAudio.play();
        }

    },
    shootFireball: function(num,x,y) {
        if(this.youCanShot){
            console.log(num,x,y);
    //        let num = Math.floor(Math.random() * 5)
    //        this.next = num;
            this.firenum++;
            x = x;
            y = y;
            fireball = this.add.sprite(x, y, 'fireball');
            fireball.animations.add('shoot', [0, 1, 2, 3]);
            fireball.animations.play('shoot', 18, true);
            fireball.scale.setTo(0.3);
            game.physics.arcade.enableBody(fireball);
            fireball.body.velocity.x = -900;
            fireball.body.velocity.y =0* Math.random()*500*(-1*Math.random()*4)
            fireball.body.allowGravity = false;
            fireball.outOfBoundsKill = true;
            fireball.lane = num;
            game.physics.enable([fireball, this.players], Phaser.Physics.ARCADE)
            this.fireballs.add(fireball);
            this.youCanShot=false;
        }

    },
    die: function(fireball, player) {
        if(player.x>50){
            player.animations.play("die",false);
            player.body.velocity.x=0;
            player.body.velocity.y=+400;

            this.combo++;
            this.timer5 = game.time.events.loop(3000, ()=>this.combo=0, this)
         let style = {
            font: "3rem Orbitron",
            fill: "#FF4136",
            align: "center"
        };

            this.messages.removeAll();
        this.messages.add(game.add.text(player.x, player.y, this.combo+'X KILL!', style));
        this.timer5.delay+=2000;  
        player.rotation += 2; 
          
            player.tint=0xF42336;
        player.body.collideWorldBounds = false;    
        this.players.remove(player);
         this.dead.add(player);
        
        }
       
    }
};