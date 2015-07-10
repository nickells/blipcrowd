var socket = io(window.location.origin);
var thisPath = window.location.href
socket.location = thisPath

socket.on('connect', function(){
	// socket.emit("setup", window.location.pathname)
	console.log('I have made a persistent two-way connection to the server!');
});

socket.on('clickEmit',function(data){
	console.log("someone clicked at ", data)
	$('#'+data).toggleClass('selected')

})