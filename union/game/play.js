var intervalB =  800, intervalP =  1600 ;

function easyMode(){

	intervalB = 1200 ;
	intervalP = 1200 ;


}
	

var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

	green: 150 ,
	
	black : 150 ,

	star : 9 ,
	
	alive : true ,
	
	greenb : 0 ,
	
	countP : 0 ,
	
	pipeGravity : 300 ,
	
	bombGravity : 300 ,

    pipeVelocity : 80 ,
	
	bombVelocity : 80 ,

	finished : false ,

	

	
    create: function() { 
	    score = 0 ;
		left_time = 0 ;
		dropBonus = false ;
		this.countP = 0 ;
		this.greenb = 0;
		this.finished = false ;
		this.pipeVelocity = 80 ;
		this.bombVelocity = 80 ;
      //  var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
       // space_key.onDown.add(this.jump, this); 
		
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
		console.log(this.game.scale.width);
		console.log(this.game.scale.height);
		this.bg= this.game.add.tileSprite(0, 0, game.cache.getImage('background').width,  game.cache.getImage('background').height, 'background');
		this.bg.tileScale.x = 480/game.cache.getImage('background').width;
		this.bg.tileScale.y = 720/game.cache.getImage('background').height;
		//this.bg.scale.setTo(this.game.scale.width/480, this.game.scale.height/this.game.scale.height);
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.pipes = this.game.add.group();
		this.pipes.enableBody = true;
        this.pipes.createMultiple(this.green, 'pipe');  
		
		this.bombs = this.game.add.group();
        this.bombs.createMultiple(this.black, 'bomb');  

        this.ironmen = this.game.add.group();
        this.ironmen.createMultiple(this.black, 'bomb1'); 
		
        this.timer = this.game.time.events.loop(intervalP, this.add_row_of_pipes, this);   

        
        this.timer1 = this.game.time.events.loop(intervalB, this.add_row_of_bombs, this);  
        this.timer2 = this.game.time.events.loop(1000, this.calculate_time, this);        

        this.bird = this.game.add.sprite(200, 400, 'bird');
		//this.bird.body.x = 100;
		//this.bird.body.y = 300;
		//this.bird.animations.add('run');
        this.bird.animations.add('run', [0, 1], 10, false);
		this.bird.animations.add('dis', [1, 2], 10, false);
		this.bird.animations.add('cheer', [3, 4], 10, true);
       // this.bird.body.gravity.y = 1000; 
        this.bird.anchor.setTo(0.5, 0.5);
        this.bird.inputEnabled = true;
        this.game.physics.enable(this.bird , Phaser.Physics.ARCADE);
		this.bird.body.collideWorldBounds = true;
		this.bird.body.bounce.set(0.5, 0.5);
		this.bird.body.checkCollision.left = true;
		this.bird.body.checkCollision.right = true;
		this.bird.scale.setTo(0.7, 0.7);
		 //this.bird.reset(100,600);
		 this.game.input.x = 200;
		 this.game.input.y = 500;
		
        var style = { font: "30px Arial", fill: "#342c2b" };

        this.stars = this.game.add.group();
        this.stars.createMultiple(this.star, 'dark'); 
        for( var i = 0 ; i < this.stars.length ; i ++ ){
        	
        	var star= this.stars.getChildAt(i);
            //this.stars.add(star);
            star.scale.setTo(0.8, 0.8);
            star.reset( 10+i*40, 10);
            star.anchor.setTo(0,0);
            star.fixedToCamera = true;

        }

      
		
		this.time_left = this.game.add.text(470, 10, "0秒", style); 
		this.time_left.anchor.setTo(1,0);
        this.time_left.fixedToCamera = true;
		// document.getElementById('resultContainer').style.display = 'none';
		//this.game.physics.setBoundsToWorld( 0 , 400, 0, 490, true );

        this.normal_sound = this.game.add.audio('normal');
        this.bigCoin_sound = this.game.add.audio('bigCoin');
        this.enemy_sound = this.game.add.audio('enemy');
         this.yeah_sound = this.game.add.audio('yeah');
	//	this.drop_sound = this.game.add.audio('drop');
		
	//	sound = document.createElement('audio');
	//    sound.setAttribute('src', 'assets/wheel.mp3');
    },

    update: function() {
        if ( /*this.bird.inWorld == false || */this.bird.alive == false){
            // this.restart_game(); 
			 this.bird.angle +=3 ;
			 this.bird.alive = false ;
	    }
	    else{
		//	console.log(this.game.input.x+" "+this.game.input.y);
			
   
      //  if (this.bird.angle < 20)
      //      this.bird.angle += 1;
	  
	    this.bird.body.x = this.game.input.x-83;
		this.bird.body.y = this.game.input.y-115;
        
       
        	this.game.physics.arcade.collide(this.bird, this.pipes, this.hit_pipe, null, this); 
	        this.game.physics.arcade.collide(this.bird, this.bonus, this.hit_bonus, null, this); 
	        this.game.physics.arcade.collide(this.bird, this.bombs, this.hit_bomb, null, this); 
	        this.game.physics.arcade.collide(this.bird, this.ironmen, this.hit_bomb, null, this); 	
       
       
      }		
		
    },


    hit_pipe: function(obj1 , obj2) {
	    if( !this.finished ){
	    	this.normal_sound.play();
		    this.bird.animations.play('run');
		    obj2.body.moves = false ;
			//this.get_sound.play();
			
			obj2.destroy()  ;
		
		   score += 1; 
	        console.log(score);

	        if( score <= 9  ){
	        	 var shine = this.game.add.sprite(200, 400, 'shine');

			    this.stars.addChildAt(shine , score-1);
			    console.log( 'length'+ this.stars.length );
			    this.stars.removeChildAt(score);
			    for( var i = 0 ; i < this.stars.length ; i ++ ){
		        	
		        	var star= this.stars.getChildAt(i);
		            //this.stars.add(star);
		            star.scale.setTo(0.8, 0.8);
		            star.reset( 10+i*40, 10);
		            star.anchor.setTo(0,0);
		            star.fixedToCamera = true;

		        }
	        }
	        if( score == 9  ){
	        	 this.finished = true ;
	        	 this.bird.animations.play('cheer');
	        	 this.yeah_sound.play();
	        	 this.game.time.events.remove(this.timer1);
		         this.game.time.events.remove(this.timer);
		         this.game.time.events.remove(this.timer2);
				
				 this.bird.body.gravity.y = 180;
		         this.bird.body.velocity.y = 200; 
				 
				 this.bird.body.collideWorldBounds = false;
		        // This time we go back to the 'menu' state
				setTimeout(function(){
					
					//_hmt.push(['_trackEvent', "bomb", "bombScore"+score]);
					document.getElementById('win').style.display = 'block';
					document.getElementById('winSecond').innerHTML = this.left_time + '秒' ;
					changeRank('win', this.score ,this.left_time );
					this.left_time = 0 ;
					this.score = 0 ;
					if( onPlay ){
						winNode.play();
					}
				}, 2000);
			 
	        }
	    }
		
	   

   //   this.label_score.text = "好运值："+(score*10);  
    },
	
	hit_bonus: function(obj1 , obj2) {
		if( !this.finished ){
			this.finished = true ;
		    //this.game.physics.destroy();
			this.bigCoin_sound.play();
		  //  this.bird.animations.play('run');
		    this.bird.animations.play('cheer');
		    this.yeah_sound.play();
		    obj2.body.moves = false ;
			//this.get_sound.play();
			
			obj2.destroy()  ;
			
		
		   score += 1; 
	        console.log(score);

	        while( score <= 9  ){
	        	 var shine = this.game.add.sprite(200, 400, 'shine');

			    this.stars.addChildAt(shine , score-1);
			    console.log( 'length'+ this.stars.length );
			    this.stars.removeChildAt(score);
			    score += 1; 
			}
			for( var i = 0 ; i < this.stars.length ; i ++ ){
		        	
		        	var star= this.stars.getChildAt(i);
		            //this.stars.add(star);
		            star.scale.setTo(0.8, 0.8);
		            star.reset( 10+i*40, 10);
		            star.anchor.setTo(0,0);
		            star.fixedToCamera = true;

		    }
		    this.game.time.events.remove(this.timer1);
		    this.game.time.events.remove(this.timer);
		    this.game.time.events.remove(this.timer2);
				
			this.bird.body.gravity.y = 180;
		    this.bird.body.velocity.y = 200; 
				 
			this.bird.body.collideWorldBounds = false;
		        // This time we go back to the 'menu' state
		    setTimeout(function(){
					
					//_hmt.push(['_trackEvent', "bomb", "bombScore"+score]);
					document.getElementById('win').style.display = 'block';
					document.getElementById('winSecond').innerHTML = this.left_time + '秒' ;
					changeRank('win', this.score ,this.left_time );
					this.left_time = 0 ;
					this.score = 0 ;
					if( onPlay ){
						winNode.play();
					}
			}, 2000);
	        
		   
		}
			

   //   this.label_score.text = "好运值："+(score*10);  
    },
	

	hit_bomb: function() {

		if( !this.finished ){
			this.enemy_sound.play();
		    this.bird.animations.play('dis');
	        if (this.bird.alive == false)
	            return;
	         this.alive = false ;
	        this.bird.alive = false;
	        this.game.time.events.remove(this.timer);
	          this.game.time.events.remove(this.timer1);
	          this.game.time.events.remove(this.timer2);
	        this.pipes.forEachAlive(function(p){
	            p.body.velocity.x = 0;
	        }, this);
			
			this.restart_game();
		}
		
		
    },

    restart_game: function() {
	     console.log('rs');
         this.game.time.events.remove(this.timer1);
         this.game.time.events.remove(this.timer);
         this.game.time.events.remove(this.timer2);
		
		 this.bird.body.gravity.y = 180;
         this.bird.body.velocity.y = 200; 
		 
		 this.bird.body.collideWorldBounds = false;
        // This time we go back to the 'menu' state
		setTimeout(function(){
			
			//_hmt.push(['_trackEvent', "bomb", "bombScore"+score]);
			document.getElementById('fail').style.display = 'block';
			
			changeRank('lose', this.score ,this.left_time );
			if( onPlay ){
				loseNode.play();
			}
			this.left_time = 0 ;
			this.score = 0 ;
			
			this.finished = false ;
		}, 1000);
		 
		
    },

    add_one_pipe: function(x, y) {
	       
           this.pipe = this.pipes.getFirstDead();
		   if(this.pipe===null ){
                this.pipe=this.game.add.sprite(x,y,'pipe');
                this.pipes.add(this.pipe);
			//	this.greenb ++ ;
					
            }
           	this.countP ++ ; 
			console.log(this.countP);
       //  this.currentHedgehog.body.setSize(95, 61, 7, 6);
           this.pipe.reset(x, y);
		   this.pipe.scale.setTo(0.8, 0.8);
		    this.game.physics.arcade.enable(this.pipe);
		   this.pipe.body.gravity.y = this.pipeGravity;
           this.pipe.body.velocity.y = this.pipeVelocity; 
           this.pipe.outOfBoundsKill = true;
		   
			this.pipe.body.checkCollision.left = true;
		   this.pipe.body.checkCollision.right = true;
		 //  this.pipe.body.collideWorldBounds = true;
	       this.pipe.body.bounce.setTo(0.5,0.5);
		
    },

    add_one_bonus: function(x, y) {
	       
           this.bonus=this.game.add.sprite(x,y,'pipe2');
           	
       //  this.currentHedgehog.body.setSize(95, 61, 7, 6);
           this.bonus.reset(x, y);
		   this.bonus.scale.setTo(0.8, 0.8);
		   this.game.physics.enable(this.bonus , Phaser.Physics.ARCADE);
		   this.bonus.body.gravity.y = this.pipeGravity;
           this.bonus.body.velocity.y = this.pipeVelocity; 
           this.bonus.outOfBoundsKill = true;
		  //  this.game.physics.arcade.enable(bonus);
			this.bonus.body.checkCollision.left = true;
		   this.bonus.body.checkCollision.right = true;
		 //  this.pipe.body.collideWorldBounds = true;
	       this.bonus.body.bounce.setTo(0.5,0.5);
		
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*7);
		if( this.pipeVelocity <= 400 )
		   this.pipeVelocity += 8 ;
		this.add_one_pipe(hole*60+10, 0);   
		if( this.pipeVelocity > 400 )
           this.add_one_pipe(((hole*3)%8)*60+10, 0); 
		 
		// if( hole % 3 == 0  )
		//    this.add_one_bomb((hole+1)*60+10, 0 , myVelocity); 
		 
		
       // for (var i = 0; i < 8; i++)
       //     if (i != hole && i != hole +1) 
       //         this.add_one_pipe(i*40+10, 0);   

        // No 'this.score', but just 'score'
       
    },
	
	add_one_bomb: function(x, y , v) {
	    this.bombVelocity += 10 ;
        this.bomb = this.bombs.getFirstDead();
       
		//this.bird.body.x = 100;
		//this.bird.body.y = 300;
		//this.bird.animations.add('run');

        this.bomb.animations.add('cap', [0, 1], 5, true);
		this.bomb.animations.play('cap');
		  if(this.bomb===null){
                return ;
            }
		    this.game.physics.arcade.enable(this.bomb);
		  // this.bomb.body.collideWorldBounds = true;
	       this.bomb.body.bounce.setTo(1, 1);
           this.bomb.reset(x, y);
		   this.bomb.body.gravity.y = this.bombGravity;
           this.bomb.body.velocity.y = this.bombVelocity; 
		   this.bomb.body.velocity.x = v;
           this.bomb.outOfBoundsKill = true;
		   
		    
	
    },

    add_one_ironman: function(x, y , v) {
	    this.bombVelocity += 10 ;
        this.bomb = this.ironmen.getFirstDead();
       
		//this.bird.body.x = 100;
		//this.bird.body.y = 300;
		//this.bird.animations.add('run');

        this.bomb.animations.add('cap', [0, 1], 5, true);
		this.bomb.animations.play('cap');
		  if(this.bomb===null){
                return ;
            }
		    this.game.physics.arcade.enable(this.bomb);
		  // this.bomb.body.collideWorldBounds = true;
	       this.bomb.body.bounce.setTo(1, 1);
	      // this.bomb.scale.setTo(0.8, 0.8);
           this.bomb.reset(x, y);
		   this.bomb.body.gravity.y = this.bombGravity;
           this.bomb.body.velocity.y = this.bombVelocity; 
		   this.bomb.body.velocity.x = v;
           this.bomb.outOfBoundsKill = true;
		   
		    
	
    },

    
    calculate_time : function(){
    	 left_time += 1 ; 
     	 this.time_left.text = left_time + '秒'; 
    },

    add_row_of_bombs: function() {
        var hole = Math.floor(Math.random()*7);
        if( hole % 2 == 1  )
		    this.add_one_bomb(((hole*3)%8)*60-10, 0);
		else
			this.add_one_ironman(((hole*3)%8)*60-10, 0);

		if( score > 7 ){
			var hole = Math.floor(Math.random()*7);
	        if( hole % 2 == 1  )
			    this.add_one_bomb(((hole*3)%8)*60-10, 0);
			else
				this.add_one_ironman(((hole*3)%8)*60-10, 0);
			
		}
		if( score == 8 ){
				var hole = Math.floor(Math.random()*7);
				this.add_one_bonus(((hole*3)%8)*60, 0);
		}

		if( score == 5 && !dropBonus ){
			 this.add_one_bonus(((hole*3)%8)*60, 0);
			 dropBonus = true ;
		}
			

		 this.bombVelocity += 10 ;
		 
		
		
       
    }
};