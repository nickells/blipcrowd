var socket = io(window.location.origin);
var thisPath = window.location.href
var localIdList = [];

socket.location = thisPath


socket.on('setup',function(ids,blips){
	// console.log(settingsObj)
	localIdList = ids
	localIdList.forEach(function(id){
		$("#people").append("<div id="+id+">"+id+"</div>")
	})
	blips.forEach(function(data){
		console.log(socket.id,"clicked at", data)
		$('#'+data).toggleClass('selected')
	})
	// //type change
	// $('#'+settingsObj[type]).toggleClass('selected')
	// $('#'+settingsObj[type]).siblings().removeClass('selected')
	// tones.type = type;
	// //release change
	// $('#release').val(settingsObj[release])
	// tones.release = settingsObj[release];
	// //bpm change
	// console.log(settingsObj[bpm])

})

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

//populate player list
socket.on('connectEmit',function(id){
	console.log(id)
	$("#people").append("<div id="+id+">"+id+"</div>")
})

socket.on('disconnectEmit',function(id){
	var i = localIdList.indexOf(socket);
    delete localIdList[i];
	console.log(id+" has left")
	$("#"+id).remove();
})