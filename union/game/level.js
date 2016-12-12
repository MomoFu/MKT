var level_state = {  

   
    create: function() {
	
	     
      /*
        var level = this.game.add.text( this.game.world.width* 0.2 , this.game.world.centerY -150, 'LEVEL '+ gate);
	    level.font = 'Open Sans';
        level.wordWrap = true;
        level.wordWrapWidth = 790; //790 and 10 above to try do some padding
        level.align = 'center';//I thought this would cause all text to move to center, but only seems to work for one line. 
        level.fontSize = 70;
        level.fill = '#F2593A';
	*/
		this.game.time.events.add( 0, function() {
                   Fade.fadeOut('play', 0);
                  });
		
    }

	
	
};