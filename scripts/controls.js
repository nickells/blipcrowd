$(document).ready(function(){


$('#bpm').on('change',function(){
	var bpm = $(this).val()
	var qtrN = Math.round(((60/bpm)*1000)*100000)/100000
	var sixteenths =(qtrN/4)
	ms = Math.round(sixteenths *100000)/100000

	if(isPlaying){
		clearInterval(timer);
		timer = setInterval(playFunc,ms)
	}
})


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