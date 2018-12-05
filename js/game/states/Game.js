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
        this.shooters = new Shooters(this.game)
        this.createPilots(4);
        this.messages = game.add.group()
        this.dead = game.add.group();

        game.physics.enable([this.ground, this.players], Phaser.Physics.ARCADE)
        game.physics.enable(this.dead, Phaser.Physics.ARCADE)

        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.monster = new Monster(this.game, this.game.width - 100, game.height, 'monster', this.players, this.shooters)
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
        this.createPilotFrequency = 300;
    },
    update: function() {
        if(this.createPilotTimer<game.time.now){
            this.createPilots(1);
            this.createPilotTimer=game.time.now+this.createPilotFrequency;
        }
            
        this.shooters.fireballs.children.filter((fireball) => fireball.x < 0).map((fireball) => fireball.destroy());
        game.physics.arcade.collide(this.players, this.ground);
        game.physics.arcade.overlap(this.shooters.fireballs, this.players, this.kill, null, this);




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
                    this.messages.add(game.add.text(player.x, player.y, this.combo.killNumber + ' X COMBO KILL!', style));
                this.players.remove(player);
                this.dead.add(player);
            }
         }
        },
    createPilots:function(numberOfPlayers){
        for(let i=0;i<numberOfPlayers;i++)    
            this.players.add(new Pilot(this.game, 0, game.height - Math.random()*850, 'pilot', this.shooters,game.time.now));

        
    }


};