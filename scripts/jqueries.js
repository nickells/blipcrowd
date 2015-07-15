//toDo
//bpm selection√
//move architecture to arrays
//chromatic vs pentatonic vs etc
//save files
//notification of new user
//user colors
//sustain/release
//refactor


$(document).ready(function(){
window.numColumns = 16
var vertArray = []
var notesArray = []
tones.type="sine"
tones.release=500;
var ms = 125;

//create board
for (var i=1;i<=numColumns;i++){
	var eachRow = [];
	for (var j=1;j<=numColumns;j++){
		var aBox = '<div class="box noselect" id="'+i+"-"+j+'">&nbsp;</div>'
		if((j-1)%4===0){
		var aBox = '<div class="box leftHard noselect" id="'+i+"-"+j+'">&nbsp;</div>'
		}
		$(aBox).appendTo('#container')
	}
	vertArray.push(eachRow)
}

//grab persistent data

window.notes =["c","c#","d","d#","e","f","f#","g",
"g#","a","a#","b","c","c#","d","d#","e"].reverse()

//bpm select
$('#bpm').on('change',function(){
	var bpm = $(this).val()
	var qtrN = Math.round(((60/bpm)*1000)*100000)/100000
	var sixteenths =(qtrN/4)
	ms = Math.round(sixteenths *100000)/100000

	socket.emit('bpmChange',[ms,bpm])

	if(isPlaying){
		clearInterval(timer);
		timer = setInterval(playFunc,ms)
	}

})
	socket.on('bpmChangeEmit',function(data){
		$('#bpm').val(data[1])
		console.log(data)
		ms = data[0];

	if(isPlaying){
		clearInterval(timer);
		timer = setInterval(playFunc,ms)
	}

	})


// $('#attack').on('change', function(){
// 	tones.attack = $(this).val()*2;
// 	console.log(tones.attack)
// })

//change sustain
$('#release').on('change', function(){
	tones.release = $(this).val();
	socket.emit('releaseChange',tones.release)
	console.log(tones.release)
})	

//set notes to be played
$('.box').on('click', function(){
	var noteCoords = $(this).attr("id").split("-")
	var thisPitch = noteCoords[0]
	socket.emit('clicked',$(this).attr("id"))
	// console.log(thisPitch-1)
	if (!$(this).hasClass('selected')){

		if (thisPitch-1 < 5){
			tones.play(notes[thisPitch-1],5);   
		}
		else{
			tones.play(notes[thisPitch-1],4);   
		}
	}
	$(this).toggleClass('selected')

})

var isPlaying;
var timer;
window.j=0

	//playing
	$('#play').on('click', function(){
		//toggle pause
		if(isPlaying === true){
			$(this).removeClass('selected')
			$(this).text("play")
			clearInterval(timer);
			isPlaying = false;
		}
		else{
			//go from left to right
			$(this).addClass('selected')
			$(this).text("pause")
			isPlaying = true;
			timer = setInterval(playFunc,ms)
		}
	})

	//settings
	$('#clear').on('click', function(){
		socket.emit('cleared');
		clearBoard();
	})

	$('#square').on('click', function(){
		changeTone.call(this,'square')
	})
	$('#sine').on('click', function(){
		changeTone.call(this,'sine')
	})
	$('#sawtooth').on('click', function(){
		changeTone.call(this,'sawtooth')
	})
	$('#triangle').on('click', function(){
		changeTone.call(this,'triangle')
	})

})


function changeTone(type){
	tones.type = type;
	// console.log(type)
	socket.emit('typeChange',tones.type);
	$(this).toggleClass('selected')
	$(this).siblings().removeClass('selected')
}

function playFunc(){
	j++
	var x = j-1
	for (var i=0;i<=numColumns;i++){
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
		if (j===numColumns+1){j=1}
	}
}

function clearBoard(){
j = 0;
isPlaying = false;
for (var i=0;i<=numColumns;i++){
	for (var y=0;y<=numColumns;y++){
		$('#'+i+'-'+y).removeClass('selected playing')
		}
	}
}

