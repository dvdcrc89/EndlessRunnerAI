const JustRun = function() {};
JustRun.Boot = {
    preload: function() {
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('preloadbar', 'assets/images/preloader-bar.png');
    },
    create: function() {
        this.game.stage.backgroundColor = '#fff';
        this.input.maxPointers = 1;

        if (this.game.device.desktop) {
            this.scale.maxHeight = 653;
            this.scale.maxWidth = 1366;

            this.scale.pageAlignHorizontally = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 568;
            this.scale.minHeight = 600;
            this.scale.maxWidth = 2048;
            this.scale.maxHeight = 1536;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');
    }
};