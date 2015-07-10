//add
//bpm selection
//chromatic vs pentatonic vs etc
//save files
//notification of new user
//user colors
//sustain/release


$(document).ready(function(){
window.numRows = 16

var vertArray = []
tones.type="sine"
tones.release=500;

for (var i=1;i<=numRows;i++){
	var eachRow = [];
	for (var j=1;j<=numRows;j++){
		var aBox = '<div class="box" id="'+i+"-"+j+'">&nbsp;</div>'
		if((j-1)%4===0){
		var aBox = '<div class="box leftHard" id="'+i+"-"+j+'">&nbsp;</div>'
		}
		$(aBox).appendTo('#container')
	}
	vertArray.push(eachRow)
}

var notes =["c","c#","d","d#","e","f","f#","g",
"g#","a","a#","b","c","c#","d","d#","e"].reverse()

$('.box').on('click', function(){
	socket.emit('clicked',$(this).attr("id"))
	var thisNote = $(this).attr("id").split("-")[0]
	console.log(thisNote-1)
	if (!$(this).hasClass('selected')){
		if (thisNote-1 < 5){
			tones.play(notes[thisNote-1],5);   
		}
		else{
			tones.play(notes[thisNote-1]);   
		}
	}
	$(this).toggleClass('selected')
})
var clicked;
var timer;
var j=0
	//playing
	$('#play').on('click', function(){
		$(this).toggleClass('selected')

		//toggle pause
		if(clicked === true){
			$(this).text("play")
			console.log('off')
			clearInterval(timer);
			clicked = false;
		}
		else{
			//go from left to right
			$(this).text("pause")
			clicked = true;
			timer = setInterval(function(){
				j++
				var x = j-1
				for (var i=0;i<=numRows;i++){
					if($('#'+i+'-'+j).hasClass('selected')){
						if (i < 6){
							tones.play(notes[i-1],5);   
						}
						else{
							tones.play(notes[i-1]);   
						}
					}
					$('#'+i+'-'+j).addClass('playing')
					$('#'+i+'-'+x).removeClass('playing')
					if (j===numRows+1){j=1}
				}
		},100)
		}
	})

	$('#clear').on('click', function(){
		socket.emit('cleared');
		clearBoard();
	})

	$('#square').on('click', function(){
		tones.type="square"
		socket.emit('typeChange',tones.type);
		$(this).toggleClass('selected')
		$(this).siblings().removeClass('selected')
	})
	$('#sine').on('click', function(){
		tones.type="sine"
		socket.emit('typeChange',tones.type);
		$(this).toggleClass('selected')
		$(this).siblings().removeClass('selected')
	})
	$('#sawtooth').on('click', function(){
		tones.type="sawtooth"
		socket.emit('typeChange',tones.type);
		$(this).toggleClass('selected')
		$(this).siblings().removeClass('selected')
	})
	$('#triangle').on('click', function(){
		tones.type="triangle"
		socket.emit('typeChange',tones.type);
		$(this).toggleClass('selected')
		$(this).siblings().removeClass('selected')
	})


})



function clearBoard(){
for (var i=0;i<=numRows;i++){
	for (var j=0;j<=numRows;j++){
		$('#'+i+'-'+j).removeClass('selected')
		}
	}
}

