
var game = new Phaser.Game(480, 720, Phaser.CANVAS, 'game_div');

var score = 0;

var allScore = 0 ;

 var myText = [] ;
 
 var len  =  0 ;
var gate = 1 ;

var alive = true ;

var chance = false ;

 var timestamp = Date.parse(new Date());
 var str = '2016-05-03'; // 日期字符串
 str = str.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
 var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
 var ppl = parseInt( (timestamp  - Date.parse(date)) / 10000 );
 $('#ppl').text(ppl);
 console.log (timestamp  - Date.parse(date));

/*
var passArray = new Array();   //先声明一维
for( var i=0 ; i<20 ; i++ ){        //一维长度为10
   if( i <= 4 )
       passArray[i]= (i+1)*8  ;    //在声明二维
   else
       passArray[i]= (i+1)*6  ;
}
*/
function changeRank( status , objCount , objTime ){
	
    var y , $con;
	if( status == 'win' ){
		$con = $('#win');

		if( objTime == 0 )
			y = 100 ;
		else if( objTime <= 5 )
			y = 99;
		else if( objTime == 6 )
			y = 90;
		else
			y = 100 - objTime * 3 ;
		var myRank = parseInt(  ppl * ( 1 - y/100 ) );

        $con.find('.myRank').text(myRank);
        $con.find('.percent').text(y+'%');
        $con.find('.myTime').text(objTime+'秒');
	}
	else{
		$con = $('#fail');
		y = objCount * 3 ;
		$('#objCount').text(objCount);
		var myRank = parseInt(  ppl * ( 1 - y/100 ) );
        $con.find('.myRank').text(myRank);
        $con.find('.percent').text(y+'%');
		$con.find('.myTime').text('失败');


	}
	 _hmt.push(['_trackEvent', "union", "unionStatus"+status+'Get'+objCount+'Time'+objTime]);
    initWX(status, objTime);
	//_hmt.push(['_trackEvent', "union", 'unionTime'+objTime]);
}



/*
game.state.add('level', level_state); 
game.state.add('load', load_state);  
game.state.add('play', play_state);   
game.state.add('boot' , boot_state);

// Start with the 'load' state
game.state.start('boot'); 
*/