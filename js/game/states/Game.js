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
        this.players.add(new Pilot(this.game, 0, game.height - 50, 'pilot', this.shooters.fireballs));
        this.players.add(new Pilot(this.game, 0, game.height - 250, 'pilot', this.shooters.fireballs));
        this.players.add(new Pilot(this.game, 0, game.height - 450, 'pilot', this.shooters.fireballs));
        this.players.add(new Pilot(this.game, 0, game.height - 850, 'pilot', this.shooters.fireballs));
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
        this.timer2 = game.time.events.loop(1000, () => {
            if (this.players.length < 10000) {
                this.players.add(new Pilot(this.game, 0, (Math.random() * game.height ), 'pilot', this.shooters.fireballs))
            }
        }, this)
        this.timer3 = game.time.events.loop(405, () => this.youCanShot = true, this)
        this.timer4 = game.time.events.loop(4000, () => this.messages.children.map(t => t.destroy()), this)
        this.timer6 = game.time.events.loop(10000, () => this.background.tint = Math.random() * 0xffffff, this)

        this.coinAudio = game.add.audio('coinAudio');
        this.ugradeAudio = game.add.audio('upgradeAudio');
        this.hitAudio = game.add.audio('hitAudio');
        console.log(this.dog, this.player);
    },
    update: function() {
        this.shooters.fireballs.children.filter((fireball) => fireball.x < 0).map((fireball) => fireball.destroy());
        game.physics.arcade.collide(this.players, this.ground);
        game.physics.arcade.collide(this.dog, this.ground);

        this.players.children.map(player => player.play());
        this.monster.play();




        game.physics.arcade.overlap(this.shooters.fireballs, this.players, this.die, null, this);




    },
    die: function(fireball, player) {
        if(this.time.now>this.combo.lastKill) {this.combo.lastKill= this.time.now; this.combo.killNumber= 0}

        if (player.x > 50) {
            player.animations.play("die", false);
            player.body.velocity.x = 0;
            player.body.velocity.y = 400;

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

            player.rotation += 2;

            player.tint = 0xF42336;
            player.body.collideWorldBounds = false;
            player.dead = true;
            this.players.remove(player);
            this.dead.add(player);

        }

    }
};