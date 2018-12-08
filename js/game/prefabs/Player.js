Player = function(game, x, y, key, players, shooters, frame) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);
    this.scale.setTo(0.3);
    this.anchor.setTo(0.5);
    this.scale.x *= -1;
    this.life = 30;
    this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19.20, 21, 22, 23]);
    this.animations.play('fly', 18, true);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    this.update = function() {
        
        //Health Points text
        if (this.showLife) this.showLife.destroy();
        let style = {
            font: "1.3rem Orbitron",
            fill: ["#ED2939"],
            align: "center"
        };
        
        this.showLife = this.life > 1 ? game.add.text(this.x, this.y - 50, this.life + 'HP', style) :
            game.add.text(this.x, this.y - 50, 'DANGER!', style)
        if (this.life < 1) {
            this.kill();
        }
        
        // Input
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) this.body.velocity.y = -500;
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) this.body.velocity.y = +500;
        else this.body.velocity.y = 0

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) this.body.velocity.x = -500;
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) this.body.velocity.x = +500;
        else this.body.velocity.x = 0

        if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && !this.shot) {
            let whereIam = 10 - Math.floor(this.body.y / ((this.game.height - 200) / 10));
            if (whereIam < 0) whereIam = 0;

            shooters.shoot(this.body.x + 100, this.body.y + 50, -900, 0, 0.3);

        }
       
    



    };
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;