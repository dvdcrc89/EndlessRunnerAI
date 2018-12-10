Upgrades = function(game, shooters, player) {
    this.shooters = shooters;
    this.player = player;
    this.game = game;
    const healthUpgrade = "Increase player health";
    const weaponUpgrade = "Increase player fire-power";
    const shieldUpgrade = "Enable shield"
    this.fisicalUpgrades = game.add.group();
    this.upgrades = [{
            frame: 'bomb',
            type: weaponUpgrade,
            level: 1,
            payload: {
                shots: [{
                    velX: +1200,
                    velY: 0,
                    size: 0.3
                }],
                shootRecall: 380,
            }
        },
        {
            frame: 'bomb',
            type: weaponUpgrade,
            level: 2,
            payload: {
                shots: [{
                    velX: +900,
                    velY: 0,
                    size: 0.24
                }, {
                    velX: +900,
                    velY: +200,
                    size: 0.24
                }, {
                    velX: +900,
                    velY: -200,
                    size: 0.24
                }],
                shootRecall: 400,
            }
        },
        {
            frame: 'bomb',
            type: weaponUpgrade,
            level: 0,
            payload: {
                shots: [{
                    velX: +1100,
                    velY: 0,
                    size: 0.24
                }, {
                    velX: +1100,
                    velY: +200,
                    size: 0.24
                }, {
                    velX: +1100,
                    velY: -200,
                    size: 0.24
                }],
                shootRecall: 350,
            }
        },

        {
            frame: 'hpbonus',
            type: healthUpgrade,
            payload: 5,
            level: 1
        },
        {
            frame: 'hpbonus',
            type: healthUpgrade,
            payload: 10,
            level: 2
        },
        {
            frame: 'hpbonus',
            type: healthUpgrade,
            payload: 20,
            level: 3
        },
        {
            frame: 'hpbonus',
            type: healthUpgrade,
            payload: 30,
            level: 4
        },
        {
            frame: 'hpbonus',
            type: healthUpgrade,
            payload: 50,
            level: 5
        },
        {
            frame: 'hpbonus',
            type: healthUpgrade,
            payload: 70,
            level: 6
        },
    ]


    /*Generate a random upgrade 5% of the time 
      unless player has less then 4 life then it generate an upgrade 65% of the time
    */
    this.generateUpgrade = function(pilot) {
        let chance = Math.floor(Math.random() * 20);
        if (chance >= 19 || (player.life < 4 && chance >= 8)) {
            let validUpgrades = this.upgrades.filter(upgrade => upgrade.level <= JustRun.Game.difficulty + 1);
            let upgrade = validUpgrades[Math.floor(Math.random() * validUpgrades.length)];
            let fisicalUpgrade = this.game.add.sprite(pilot.x, pilot.y, upgrade.frame);
            fisicalUpgrade.scale.setTo(0.15);
            game.physics.arcade.enableBody(fisicalUpgrade);
            fisicalUpgrade.body.velocity.x = -100;
            fisicalUpgrade.effect = upgrade;
            this.fisicalUpgrades.add(fisicalUpgrade);
        }


    }

    this.applyUpgrade = function(player, fisicalUpgrade) {
        let upgrade = fisicalUpgrade.effect;
        switch (upgrade.type) {
            case healthUpgrade:
                player.life += upgrade.payload;
                break;
            case weaponUpgrade:
                this.shooters.upgrade = upgrade.payload;
                break;
            case shieldUpgrade:
                player.hasShield = true;
                break;
            default:
                break;
        }

    }

}



Upgrades.prototype = Object.create(Phaser.Sprite.prototype);
Upgrades.prototype.constructor = Upgrades;