Monster = function(game, x, y, key,players,shooters,frame) {

    Phaser.Sprite.call(this, game, x, y, key, frame);
    game.add.existing(this);
    this.scale.setTo(0.5);
    this.anchor.setTo(0.5);
    this.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19.20,21,22,23]);
    this.animations.play('fly', 18, true);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y =0;
    this.shot=false;
    
    this.play = function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) this.body.velocity.y= -900;
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) this.body.velocity.y= +900;
    else     this.body.velocity.y= 0
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&!this.shot) {
                    let whereIam=  10 - Math.floor(this.body.y / ((this.game.height - 200) / 10));
                     if (whereIam<0) whereIam=0;

    shooters.shoot(this.body.x+100,this.body.y+50,-900,0,0.3);
//    JustRun.Game.shootFireball(this.body.x+100,this.body.y+50,-900,300,0.05);
//            JustRun.Game.shootFireball(this.body.x+100,this.body.y+50,-900,-300,0.05);



    this.shot=true;
    }
        
    setInterval(()=>this.shot=false,1000)    
        
        
//        let chance = Math.floor(Math.random()*500);
//        if(chance===199){
//        if(this.body.x>this.game.width/2){
//        this.body.velocity.x= -1100;
//    }else{
//        this.body.velocity.x= 1100;
//
//    }
//    }
//    }

    
};
}

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;