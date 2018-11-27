Shooters = function(game) {
    this.game = game;
    this.fireballs = game.add.group();
    this.isReady = true;
    this.fireballTime = game.time.now
    this.upgrade= {
        shots:[{
            velX: -900,
            velY: -60,
            size: 0.3
            },{
            velX: -900,
            velY: 0,
            size: 0.3
            },{
            velX: -900,
            velY: +Math.random()*100,
            size: 0.3
            }
            ],
        shootRecall:100
    };
    this.shoot= function (x,y){
        if(game.time.now > this.fireballTime){

        this.upgrade.shots.forEach(shot=>{
            let fireball = this.game.add.sprite(x, y, 'fireball');
            fireball.animations.add('shoot', [0, 1, 2, 3]);
            fireball.animations.play('shoot', 18, true);
            fireball.scale.setTo(shot.size);
            game.physics.arcade.enableBody(fireball);
            fireball.body.velocity.x = shot.velX;
            fireball.body.velocity.y = shot.velY
            fireball.body.allowGravity = false;
            fireball.outOfBoundsKill = true;
            game.physics.enable(fireball,Phaser.Physics.ARCADE)
            this.fireballs.add(fireball);
 
        })
         this.fireballTime=game.time.now+this.upgrade.shootRecall;                                                                         
        }
    }
      

    }
    
    
Shooters.prototype = Object.create(Phaser.Sprite.prototype);
Shooters.prototype.constructor = Shooters;
