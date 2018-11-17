JustRun.Game = function() {}
JustRun.Game = {

    create: function() {
        this.score = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 0;

        this.background = game.add.tileSprite(0, 0, game.width, game.height - 23, 'background');
        this.background.autoScroll(-150, 0);
        this.ground = game.add.tileSprite(0, game.height - 23, game.width, 23, 'ground');
        this.ground.autoScroll(-350, 0);
        this.player = new Pilot(this.game, 300, 100, 'player1')


        game.physics.enable([this.ground, this.player], Phaser.Physics.ARCADE)
        this.ground.body.collideWorldBounds = true;
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;
        this.coins = game.add.group();
        this.fireballs = game.add.group();
        this.dog = new Dog(this.game, 700, game.height - 380, 'dog');

        this.hit = 0;
        this.firenum=0;

        let style = {
            font: "2rem Orbitron",
            fill: "#F3B326",
            align: "center"
        };
        this.scoreText = game.add.text(10, 10, 'Score: ' + this.score, style);
        this.timer = game.time.events.loop(300, this.createCoin, this)

        //    this.timer2 = game.time.events.loop(15000,this.createUpgrade,this)
        this.timer3 = game.time.events.loop(600, this.shootFireball, this)

        this.coinAudio = game.add.audio('coinAudio');
        this.ugradeAudio = game.add.audio('upgradeAudio');
        this.hitAudio = game.add.audio('hitAudio');
    },
    update: function() {
           game.physics.arcade.collide(this.player, this.ground);
        game.physics.arcade.collide(this.dog, this.ground);
        this.dog.play();
        this.player.play();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.dog.isAuto = true;
            this.player.setAuto(false);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.dog.isAuto = false;
            this.player.setAuto(true);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.dog.isAuto = true;
            this.player.setAuto(true);
        }
        
        
        this.scoreText.destroy();
        let style = {
            font: "2.5rem Orbitron",
            fill: "#F3B326",
            align: "center"
        };
        this.scoreText = game.add.text(10, 10, 'Score: ' + this.score, style);
     
        if (this.dog.body.touching.down) this.dog.animations.play('run');




        game.physics.arcade.overlap(this.coins, this.player, this.getCoin, null, this);
        game.physics.arcade.overlap(this.coins, this.dog, this.getCoin, null, this);
        game.physics.arcade.overlap(this.fireballs, this.player, this.die, null, this);
        game.physics.arcade.overlap(this.player, this.planeUpgrade, this.transformPlane, null, this);
        game.physics.arcade.overlap(this.player, this.robotUpgrade, this.transormRobot, null, this);

        //     let timerFireball = 1000-this.score/5;
        //     if(timerFireball<500) timerFireball=500;
        this.timer3.delay -= 0.01

    },
    createCoin: function() {
        x = this.game.width + 100;
        y = 420 - (200 * Math.floor(Math.random() * 3));
        coin = this.add.sprite(x, y, 'coin');
        coin.scale.setTo(0.15);
        game.physics.arcade.enableBody(coin);
        coin.body.velocity.x = -350;
        coin.body.allowGravity = false;
        game.physics.enable([coin, this.player], Phaser.Physics.ARCADE)
        coin.outOfBoundsKill = true;


        this.coins.add(coin);
    },
    getCoin: function(player, coin) {
        if (coin.scale.x > 0.1) {
            this.score++;
            coin.body.velocity.y = -1050;
            coin.body.velocity.x = -850;
            coin.scale.setTo(0.07);
            //            this.coinAudio.play();
        }

    },
    createUpgrade: function() {
        let number = Math.floor(Math.random() * 10)
        if (number % 2 == 0) {
            x = this.game.width + 100;
            y = this.game.height - 152;
            planeUpgrade = this.add.sprite(x, y, 'planeUpgrade');
            game.physics.arcade.enableBody(planeUpgrade);
            planeUpgrade.body.allowGravity = false;
            planeUpgrade.outOfBoundsKill = true;
            planeUpgrade.scale.setTo(0.3);
            planeUpgrade.body.velocity.x = -350
            this.planeUpgrade = planeUpgrade;
        } else {
            x = this.game.width + 100;
            y = this.game.height - 170;
            robotUpgrade = this.add.sprite(x, y, 'robotUpgrade');
            game.physics.arcade.enableBody(robotUpgrade);
            robotUpgrade.body.allowGravity = false;
            robotUpgrade.outOfBoundsKill = true;
            robotUpgrade.scale.setTo(0.3);
            robotUpgrade.body.velocity.x = -350
            this.robotUpgrade = robotUpgrade;

        }

    },
    shootFireball: function() {

        let num = Math.floor(Math.random() * 5)
        this.next = num;
        this.firenum++;
        x = this.game.width + 100;
        y = this.game.height - (130 + (this.game.height / 5 * num));
        fireball = this.add.sprite(x, y, 'fireball');
        fireball.animations.add('shoot', [0, 1, 2, 3]);
        fireball.animations.play('shoot', 18, true);
        fireball.scale.setTo(0.3);
        game.physics.arcade.enableBody(fireball);
        fireball.body.velocity.x = -900;
        fireball.body.allowGravity = false;
        fireball.outOfBoundsKill = true;
        fireball.lane = num;
        game.physics.enable([fireball, this.player], Phaser.Physics.ARCADE)


        this.fireballs.add(fireball);


    },
    die: function(player, fireball) {
        fireball.kill();
        this.hit++;
        console.log(this.hit,this.hit/this.firenum*100);
        if (true) {
            //             this.game.paused = true;
        } else {
            this.hitAudio.play();
            this.transformHuman();
        }
    }
};