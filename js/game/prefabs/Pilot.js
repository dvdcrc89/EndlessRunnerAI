Pilot = function(game, x, y, key, shooter,timeStart,isArmed,isInteligent, frame) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);
    this.forget = [];
    this.fixedX = x;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.24);
    this.scale.x *= -1;
    this.animations.add('run', [1, 2]);
    this.animations.add('die', [0]);
    this.animations.add('shoot', [3, 4, 5, 6, 7]);
  
    if (isArmed) this.animations.play('shoot', 18, true);
    else
        this.animations.play('run', 18, true);
    this.game.physics.arcade.enableBody(this);

    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;
    this.upsidedown = false;
    if(isArmed)
        this.vel = -(Math.random() * 350)-30;
    else
        this.vel = -(Math.random() * 150)-20;

    if(isInteligent) this.vel-=100;
    

    this.dead = false;
    this.life=Math.random()*5;
    game.physics.arcade.gravity.y = 0;
    this.update = function() {
     this.body.velocity.x = this.vel;

        if (this.body.x <130) {
            this.dead=true;
            this.destroy();
        }

        if (!this.dead && isInteligent) {
            let random = Math.floor(Math.random() * 1000);
            if (random == 999 && !this.upsidedown) {
                this.scale.y *= -1;
                this.upsidedown = true
            } else if (this.upsidedown && random < 5) {
                this.scale.y *= -1;
                this.upsidedown = false
            }
            if (random > 990) {
                this.goToLane([0, 5][Math.floor(Math.random() * 2)])

            }
            
          
                shooter.fireballs.children.filter((fireball) => fireball.body.x > this.body.x && !this.forget.includes(fireball)).forEach((fireball) => {
                    this.forget.filter(fireball => fireball.x < 0).forEach(fireball => fireball.destroy());
                    let whereIam = 10 - Math.floor(this.body.y / ((this.game.height - 200) / 10));
                    if (whereIam < 0) whereIam = 0;
                    if (fireball.body.x - this.body.x < 400 + (this.vel / 10) && (Math.abs(fireball.body.y - this.body.y) < 100)) {
                        this.forget.push(fireball);
                        if (whereIam > 8) n = 0
                        else if (whereIam < 2) n = 5;
                        else n = [0, 5][Math.floor(Math.random() * 2)]
                        setTimeout(this.goToLane(n), 600 + Math.random() * 600);
                    }
                })

    
        }
    }


    this.goToLane = function(lane) {
        let y = this.game.height - (130 + (this.game.height / 5 * lane))

        game.physics.arcade.moveToXY(this, this.fixedX, y, 1400);

    }
    
    this.die= function(){
         if(!isArmed) this.animations.play("die", false);
         this.body.velocity.x *= 0.3;
         this.life--;
        console.log(this.life)
        if(this.life<1){
            this.body.velocity.x = 0;
            this.body.velocity.y = 400;
            this.rotation += 2;
            this.tint = 0xF42336;
            this.body.collideWorldBounds = false;
            this.dead = true;
            let upgrade = Math.floor(Math.random()*(Math.floor(Math.random()*8)+1));            
            shooter.getUpgrade(upgrade);
        } else{
              let normalTint= this.tint;
              this.tint = 0xF42336;
              setTimeout(()=>this.tint=normalTint,300)
        }
           
    }


};

Pilot.prototype = Object.create(Phaser.Sprite.prototype);
Pilot.prototype.constructor = Pilot;