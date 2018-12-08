JustRun.MainMenu = function() {}
JustRun.MainMenu = {
    create: function(){
        this.background = game.add.tileSprite(0, 0, game.width, game.height - 1, 'background');
        this.buttons =game.add.group();
        let x = 0;
        this.t=0;
        this.background.tint = Math.random() * 0xffffff
        this.generateButton(this.game.width/2,x,350,150,'button','Start',()=>{
             if(this.randomAudio) this.randomAudio.stop();
             this.state.start('Game');    
        },this)
        this.generateButton(this.game.width/2,250,350,150,'button','Leaderboard',()=>console.log("1"))
        this.generateButton(this.game.width/2,350,350,150,'button','Setting',()=>console.log("2"))
        this.generateButton(this.game.width/2,450,350,150,'button','Help',()=>console.log("3"))
        console.log(this.buttons);
        this.randomAudio= game.add.audio('randomSounds')
        this.randomAudio.loop = true;
        this.randomAudio.play();
        
    },
    update: function(){
        

        this.t+=0.016;
        this.ratio = this.t/3;
        if(this.ratio>1) this.ratio=1
        this.buttons.children.forEach((button,index) =>{ 
            button.y = this.bounce(this.ratio)*100*(index+2);
                            button.textButton.y = button.y;
                           });
        
        

        
    },  
    generateButton:function(x,y,width,height,frame,text,fn){
        let button = game.add.button(x,y,frame,fn,this);
        button.anchor.setTo(0.5,0.5);
        button.width = width;
        button.height = height;
        let style = { font: "2rem Orbitron", fill: "#C21807 ", align: "center" };    
        button.textButton = game.add.text(button.x,button.y,text,style);
        button.textButton.anchor.setTo(0.5,0.5);
     
        this.buttons.add(button);
    },
      bounce : function(ratio) {
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