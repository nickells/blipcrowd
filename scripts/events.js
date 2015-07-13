var socket = io(window.location.origin);
var thisPath = window.location.href
socket.location = thisPath

socket.on('connect', function(){
	// socket.emit("setup", window.location.pathname)
	console.log('I have made a persistent two-way connection to the server!');
});

socket.on('clickEmit',function(data){
	console.log(socket.id,"clicked at", data)
	$('#'+data).toggleClass('selected')
})

socket.on('clearedEmit',function(){
	clearBoard()
})


socket.on('typeChangeEmit',function(type){
	$('#'+type).toggleClass('selected')
	$('#'+type).siblings().removeClass('selected')
	tones.type = type;
})

socket.on('releaseChangeEmit',function(data){
	// console.log(data)
	$('#release').val(data)
	tones.release = data;
})

