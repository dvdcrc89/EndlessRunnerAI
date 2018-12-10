Shooters = function(game) {
    this.game = game;
    this.fireballs = game.add.group();
    this.isReady = true;
    this.fireballTime = game.time.now;
    this.bullets = game.add.group();
    this.upgradeLevel = 0;
    this.upgrade = {
        shots: [{
            velX: +900,
            velY: 0,
            size: 0.23
        }],
        shootRecall: 400,
    };

    //Shooting function for Player
    this.shoot = function(x, y) {

        if (game.time.now > this.fireballTime) {
            // it fires a fireball for every shot in shots
            this.upgrade.shots.forEach(shot => {

                let fireball = this.game.add.sprite(x, y, 'fireball');
                fireball.animations.add('shoot', [0, 1, 2, 3]);
                fireball.animations.play('shoot', 18, true);
                fireball.scale.setTo(shot.size);
                game.physics.arcade.enableBody(fireball);
                fireball.body.velocity.x = shot.velX;
                fireball.body.velocity.y = shot.velY
                fireball.body.allowGravity = false;
                fireball.outOfBoundsKill = true;
                fireball.scale.x *= -1;
                game.physics.enable(fireball, Phaser.Physics.ARCADE)
                this.fireballs.add(fireball);

            })
            this.fireballTime = game.time.now + this.upgrade.shootRecall;
        }
    }

    //Shooting function for enemies (Pilots)
    this.shootBullet = function(pilot) {
        let bullet = this.game.add.sprite(pilot.x - 50, pilot.y, 'bullet');
        bullet.animations.add('shoot', [0]);
        bullet.animations.play('shoot', 18, true);
        bullet.scale.setTo(0.30);
        game.physics.arcade.enableBody(bullet);
        bullet.body.velocity.x = -500;
        this.bullets.add(bullet);

    }

}

Shooters.prototype = Object.create(Phaser.Sprite.prototype);
Shooters.prototype.constructor = Shooters;