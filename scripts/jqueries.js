$(document).ready(function(){
	// var soundArr = [];
	// 	soundArr.push("#audio0","#audio1","#audio2","#audio3","#audio4","#audio5","#audio6",
	// 		"#audio7","#audio8","#audio9","#audio10","#audio11","#audio12","#audio13",
	// 		"#audio14","#audio15","#audio16")

var vertArray = []

for (var i=1;i<=17;i++){
	var eachRow = [];
	for (var j=1;j<=17;j++){
		var aBox = '<div class="box" id="'+i+"-"+j+'">&nbsp;</div>'
		$(aBox).appendTo('#container')
	}
	vertArray.push(eachRow)
}

$('.box').on('click', function(){
	var thisNote = $(this).attr("id").split("-")[0]
	console.log('playing note ',$('.note')[thisNote-1])
	console.log($('note')[3])
	$('.note')[thisNote-1].play();
		// console.log('you clicked box')
		$(this).toggleClass('selected')
		//do dB call to change note value
	})
var clicked;
var timer;
var j=0
	//playing
	$('#play').on('click', function(){
		//toggle pause
		if(clicked === true){
			$(this).text("\u25B6")
			console.log('off')
			// console.log(timer)
			clearInterval(timer);
			clicked = false;
		}
		else{
			//go from left to right
			$(this).text("\u23F8")
			console.log('on')
			clicked = true;
			timer = setInterval(function(){
				j++
				var x = j-1
				for (var i=0;i<=17;i++){
					if($('#'+i+'-'+j).hasClass('selected')){
						$('.note')[i-1].play();
					}
					$('#'+i+'-'+j).addClass('playing')
					$('#'+i+'-'+x).removeClass('playing')

					if (j===18){
						j=1}
					}

				},100)

		}
	})

})




// function playFunction(){

// }

