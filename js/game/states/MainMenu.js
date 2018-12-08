JustRun.MainMenu = function() {}
JustRun.MainMenu = {
    create: function() {
        this.background = game.add.tileSprite(0, 0, game.width, game.height - 1, 'background');
        this.buttons = game.add.group();
        this.buttonsText = game.add.group();
        this.primaryColor = "#C21807";
        this.activeColor = "#0892D0"
        let x = 0;
        this.t = 0;
        this.background.tint = Math.random() * 0xffffff;
        this.initialMenu();
        console.log(this.buttons);
        this.menuAudio = game.add.audio('menuAudio');
        this.menuAudio.loop = true;
        this.menuAudio.play();
        game.difficulty = 0;
        game.audio=true;
    },
    update: function() {
        this.t += 0.016;
        this.ratio = this.t / 2;
        if (this.ratio > 1) this.ratio = 1
        this.buttons.children.forEach((button, index) => {
            button.y = this.bounce(this.ratio) * 100 * (index + 2);
            button.textButton.y = button.y;
        });
    },
    generateButton: function(x, y, width, height, frame, text, color, fn) {
        let button = game.add.button(x, y, frame, fn, this);
        button.anchor.setTo(0.5, 0.5);
        button.width = width;
        button.height = height;
        let style = {
            font: "2rem Orbitron",
            fill: color,
            align: "center"
        };
        button.textButton = game.add.text(button.x, button.y, text, style);
        button.textButton.anchor.setTo(0.5, 0.5);
        this.buttonsText.add(button.textButton);
        this.buttons.add(button);
    },
    initialMenu: function() {

        this.generateButton(this.game.width / 2, 150, 350, 150, 'button', 'Start', this.primaryColor, () => {
            if (this.randomAudio) this.randomAudio.stop();
            this.state.start('Game');
        }, this)
        this.generateButton(this.game.width / 2, 250, 350, 150, 'button', 'Leaderboard', this.primaryColor, () => console.log("1"))
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Setting', this.primaryColor, () => {
            this.clearOldMenu();
            this.settingMenu();
        })
        this.generateButton(this.game.width / 2, 450, 350, 150, 'button', 'Help', this.primaryColor, () => console.log("3"))
    },
    settingMenu: function() {
        this.generateButton(this.game.width / 2, 250, 350, 150, 'button', 'Difficulty', this.primaryColor, () => {
            this.clearOldMenu();
            this.difficultyMenu();

        })
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Audio', this.primaryColor, () => {
            this.clearOldMenu();
            this.audioMenu();
        })
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Back', this.primaryColor, () => {
            this.clearOldMenu();
            this.initialMenu();
        })

    },
    difficultyMenu: function() {
        let normColor = game.difficulty === 0 ? this.activeColor : this.primaryColor;
        let champColor = game.difficulty === 0 ? this.primaryColor : this.activeColor;
        this.generateButton(this.game.width / 2, 250, 350, 150, 'button', 'Normal', normColor, () => {
            game.difficulty = 0;
            this.clearOldMenu();
            this.initialMenu();
        })
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Champion', champColor, () => {
            game.difficulty = 1;
            this.clearOldMenu();
            this.initialMenu();
        })
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Back', this.primaryColor, () => {
            this.clearOldMenu();
            this.settingMenu();

        })
    },
    audioMenu: function(){
        let audioColor = game.audio === true ? this.activeColor : this.primaryColor;
        let noAudioColor = game.audio === true ? this.primaryColor : this.activeColor;
              this.generateButton(this.game.width / 2, 250, 350, 150, 'button', 'Loud', audioColor, () => {
            game.audio = true;
            this.menuAudio.stop();
            this.menuAudio.play();
            this.clearOldMenu();
            this.settingMenu();
        })
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Mute', noAudioColor, () => {
            game.audio = false;
            this.menuAudio.stop();
            this.clearOldMenu();
            this.settingMenu();
        })
        this.generateButton(this.game.width / 2, 350, 350, 150, 'button', 'Back', this.primaryColor, () => {
            this.clearOldMenu();
            this.settingMenu();

        })
        
    },
    clearOldMenu: function() {
        console.log(game.difficulty)
        this.buttons.removeAll();
        this.buttonsText.removeAll();
        this.t = 0;
        this.background.tint = Math.random() * 0xffffff;

    },
    bounce: function(ratio) {
        if (ratio < 1 / 2.75) {
            return 7.5625 * ratio * ratio
        } else if (ratio < 2 / 2.75) {
            let r = ratio - 1.5 / 2.75
            return 7.5625 * r * r + 0.75
        } else if (ratio < 2.5 / 2.75) {
            let r = ratio - 2.25 / 2.75
            return 7.5625 * r * r + 0.9375
        } else {
            let r = ratio - 2.625 / 2.75
            return 7.5625 * r * r + 0.984375
        }
    }
}