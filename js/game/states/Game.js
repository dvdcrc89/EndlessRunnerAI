JustRun.Game = function() {}
JustRun.Game = {

    create: function() {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.gameStartAt=game.time.now;
        this.background = game.add.tileSprite(0, 0, game.width, game.height - 1, 'background');
        this.background.autoScroll(-350, 0);
        this.ground = game.add.tileSprite(0, game.height - 1, game.width, 1, 'ground');
        this.ground.autoScroll(-750, 0);
        this.coins = game.add.group();
        this.players = game.add.group();
        this.shooters = new Shooters(this.game)
        this.createPilots(10);
        this.messages = game.add.group()
        this.dead = game.add.group();

        game.physics.enable([this.ground, this.players], Phaser.Physics.ARCADE)
        game.physics.enable(this.dead, Phaser.Physics.ARCADE)

        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.monster = new Monster(this.game, 200, game.height, 'monster', this.players, this.shooters)
        this.youCanShot = true;
        this.combo = {
            lastKill: this.time.now,
            killNumber: 0
        };
       
        this.timer6 = game.time.events.loop(10000, () => this.background.tint = Math.random() * 0xffffff, this)

        this.coinAudio = game.add.audio('coinAudio');
        this.ugradeAudio = game.add.audio('upgradeAudio');
        this.hitAudio = game.add.audio('hitAudio');
        this.createPilotTimer = game.time.now;
        this.createPilotFrequency = 1000;
    },
    update: function() {
//        this.createPilotFrequency = 800 + ((this.gameStartAt - game.time.now)/30);
//        if(this.createPilotFrequency<400) this.createPilotFrequency = 400;
//        if(this.createPilotTimer<game.time.now && this.players.length <100){
//            this.createPilots(1);
//            this.createPilotTimer=game.time.now+this.createPilotFrequency;
//        }
        
        
        if(game.time.now-this.gameStartAt<20000){
            if(this.players.length <6){
                console.log("Step1")
                this.createPilots(10-this.players.length,false,false);
            }
        } else if (game.time.now-this.gameStartAt<40000){
            console.log("Step2")
            if(this.players.length <4)
               this.createPilots(6-this.players.length,true,false);

        } else if (game.time.now-this.gameStartAt<90000 ){
            console.log(this.players.length)
                        if(this.players.length <1)

               this.createPilots(4,true,true);
        }
        
        
            
        this.shooters.fireballs.children.filter((fireball) => fireball.x < 0).map((fireball) => fireball.destroy());
        game.physics.arcade.collide(this.players, this.ground);
        game.physics.arcade.overlap(this.shooters.fireballs, this.players, this.kill, null, this);
        game.physics.arcade.overlap(this.shooters.bullets, this.monster, (player,bullet)=>bullet.kill(), null, this);





    },
    kill: function(fireball, player) {
         if(fireball!==player.hittedBy){
            player.die();
            player.hittedBy=fireball; 
            console.log(player.life);
            if(player.life<1){
            if(this.time.now>this.combo.lastKill) {this.combo.lastKill= this.time.now; this.combo.killNumber= 0}
                this.combo.lastKill = this.time.now+1000
                this.combo.killNumber++;

                let style = {
                    font: "3rem Orbitron",
                     fill: ["#732C7B","#CC0000","#660099","#FFD300","#DF6E21","#2096BA"]
                            [Math.floor(Math.random()*6)],
                    align: "center"
                };

                this.messages.removeAll();
                if (this.combo.killNumber>1)
                    this.messages.add(game.add.text(player.x-200, player.y, this.combo.killNumber + ' X HIT!', style));
                this.players.remove(player);
                this.dead.add(player);
            }
         }
        },
    createPilots:function(numberOfPlayers,areArmed,areInteligents){
        for(let i=0;i<numberOfPlayers;i++)    
            this.players.add
            (new Pilot(this.game, this.game.width, game.height/numberOfPlayers *i, 'pilot', this.shooters,this.gameStartAt,areArmed,areInteligents));

        
    }


};