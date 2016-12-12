

var boot_state = { 
   preload: function() {  
      //  this.game.load.image('background', 'assets/boot/background.png');
    },

    create: function() {
	     this.input.maxPointers = 1;
        // When all assets are loaded, go to the 'menu' state
		if (this.game.device.desktop)
        {
             this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         //   this.scale.minWidth = gameWidth/2;
         //   this.scale.minHeight = gameHeight/2;
         //   this.scale.maxWidth = gameWidth;
         //   this.scale.maxHeight = gameHeight;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            // this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           
            this.scale.maxWidth = 2048; //You can change this to gameWidth*2.5 if needed
            this.scale.maxHeight = 1228; //Make sure these values are proportional to the gameWidth and gameHeight
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            //this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
          //  this.scale.setScreenSize(true);
        }
	    this.scale.setShowAll();
        this.scale.refresh();
        this.game.state.start('load');
    },
	
	gameResized: function (width, height) {
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.


    },
    enterIncorrectOrientation: function () {
        this.game.orientated = false;


       // document.getElementById('orientation').style.display = 'block';
    },
    leaveIncorrectOrientation: function () {
        this.game.orientated = true;
       // document.getElementById('orientation').style.display = 'none';
    },
	
	

	
	
};