Upgrades = function(game,shooters,player){
    this.shooters = shooters;
    this.player = player;
    this.game = game;
    const healthUpgrade = "Increase player health";
    const weaponUpgrade = "Increase player fire-power";
    const shieldUpgrade = "Enable shield"
    this.fisicalUpgrades = game.add.group();
     this.upgrades = [
        {
            frame: 'bomb',type: weaponUpgrade,level:1,
             payload:{
                shots:[{velX: +1200,velY: 0,size: 0.3}],
                shootRecall:380,
             }
        },
         {
            frame: 'bomb',type: weaponUpgrade,level:2,
             payload:{
                shots:[{velX: +900,velY: 0,size: 0.24},{velX: +900,velY: +200,size: 0.24},{velX: +900,velY: -200,size: 0.24}],
                shootRecall:400,
             }
        },
          {
            frame: 'bomb',type: weaponUpgrade,level:3,
             payload:{
                shots:[{velX: +900,velY: 0,size: 0.24},{velX: +900,velY: +300,size: 0.24},{velX: +900,velY: -300,size: 0.24},
                     {velX: +900,velY: +100,size: 0.24},{velX: +900,velY: -100,size: 0.24}],
                shootRecall:300,
             }
        },
        
        {frame: 'hpbonus',type: healthUpgrade,payload:5,level:1},
        {frame: 'hpbonus',type: healthUpgrade,payload:10,level:2},
        {frame: 'hpbonus',type: healthUpgrade,payload:30,level:3},
        {frame: 'hpbonus',type: healthUpgrade,payload:40,level:4},
        {frame: 'hpbonus',type: healthUpgrade,payload:50,level:5},
        {frame: 'hpbonus',type: healthUpgrade,payload:100,level:6},
        ]
    

    
    this.generateUpgrade = function(pilot){
            let chance = Math.floor(Math.random()*20);
            console.log(chance);
            if (chance<19) return;
            let validUpgrades = this.upgrades.filter(upgrade=>upgrade.level <= JustRun.Game.difficulty+1);
            let upgrade = validUpgrades[Math.floor(Math.random()*validUpgrades.length)];
            let fisicalUpgrade = this.game.add.sprite(pilot.x,pilot.y,upgrade.frame);
            fisicalUpgrade.scale.setTo(0.15);
            game.physics.arcade.enableBody(fisicalUpgrade);
            fisicalUpgrade.body.velocity.x = -100;
            fisicalUpgrade.effect = upgrade;
            this.fisicalUpgrades.add(fisicalUpgrade);
                    
            
    }
    
    
    this.applyUpgrade = function(player,fisicalUpgrade){
        let upgrade = fisicalUpgrade.effect;
        console.log(upgrade);
        switch(upgrade.type){
            case healthUpgrade: player.life += upgrade.payload;
                                        console.log("health");
                                        break;
            case weaponUpgrade: this.shooters.upgrade= upgrade.payload;
                                        break;
            case shieldUpgrade: player.hasShield = true;
                                        break;
                
            default: break;    
        }
        
    }
    
}



Upgrades.prototype = Object.create(Phaser.Sprite.prototype);
Upgrades.prototype.constructor = Upgrades;