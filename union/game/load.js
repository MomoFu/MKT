

var load_state = {  
    preload: function() { 
	
        this.game.stage.backgroundColor = '#000000';
     	
		 this.game.load.atlasJSONHash('bird', 'animation/try.png', 'animation/try.json');
         this.game.load.atlasJSONHash('bomb', 'animation/captain.png', 'animation/captain.json');
	    this.game.load.image('pipe', 'images/p4_avengers.png'); 
		this.game.load.image('pipe2', 'images/p4_bonus.png');		
		//this.game.load.image('bomb', 'images/p4_captian.gif');  
		this.game.load.atlasJSONHash('bomb1', 'animation/ironman.png', 'animation/ironman.json');  
		this.game.load.image('background', 'images/p4_bg.jpg');  
		this.game.load.image('dark', 'images/p4_get2.png');
		this.game.load.image('shine', 'images/p4_get1.png');
        this.game.load.audio('enemy', 'music/enemy.mp3');
        this.game.load.audio('normal', 'music/normal.mp3');
        this.game.load.audio('bigCoin', 'music/bigCoin.mp3');
        this.game.load.audio('yeah', 'music/yeah.mp3');
		
		
    },

    create: function() {
      
       // this.game.state.start('level');
    },
	
	

	
	
};