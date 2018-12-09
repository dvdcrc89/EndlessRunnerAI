JustRun.GameOver = function() {}
JustRun.GameOver = {
        
    create: function(){
      
      this.background=game.add.tileSprite(0, 0, game.width, game.height - 1, 'background');
      this.background.autoScroll(-30,-0);
       let style = {
            font: "6rem Orbitron",
            fill: "#0892D0",
            align: "center"
        };
        this.scoreText = game.add.text(this.game.width/4, 100, 'GAME OVER', style);
        style = {
            font: "4rem Orbitron",
            fill: "#C21807",
            align: "center"
        };
        this.scoreText = game.add.text(this.game.width/4, 250, 'Score: ' + game.scoreStats.score, style);
        style = {
            font: "2rem Orbitron",
            fill: "#C21807",
            align: "center"
        };
        this.higherComboText = game.add.text(this.game.width/4  , 350, 'Biggest Combo: ' + game.scoreStats.higherCombo + "X", style);
        let button = game.add.button(this.game.width/2, 550, 'button', ()=>{
         this.state.start('MainMenu');
        }, this);
        button.anchor.setTo(0.5, 0.5);
        button.width = 300;
        button.height = 200;
        button.textButton = game.add.text(button.x, button.y, 'Go to Menu', style);
        button.textButton.anchor.setTo(0.5, 0.5);
        this.gameOverAudio = game.add.audio('gameOver');
        if(game.audio)
            setTimeout(()=>this.gameOverAudio.play(),1000);

    },
    
    update: function(){
    },

}