/**
 * Created by POL on 19/01/2017.
 */

//Instance du worker

    var w = new Worker("js/worker.js");

//Sprite
var charlie = $('.player');

//Création du tableau de la map
var map = [];
for(var i=0;i<10;i++){
    map.push([]);
    for(var j=0;j<10;j++){
        map[i].push( Math.round(Math.random()) );
    }
}
console.log(map);
//Display de la map
for(var i=0;i<10;i++){
    $('.map').append("<div class='row'></div>");
    for(var n=0;n<10;n++){
         switch (map[i][n]){
         case 0:
         $('.row').eq(i).append("<div class='grass'></div>");
         break;
         case 1:
         $('.row').eq(i).append("<div class='rock'></div>")
         break;
         }

    }
}



var moveRequest = {
    top:0,
    left:0
}

//Clavier
$(".map").on("keydown keyup", function(e){
    var keypress = e.keyCode;
    var keytype = e.type;
    charlie.removeClass('stopRunning');

    //Recupere les saisies
    if([68,81,83,90].indexOf(keypress) != -1){
        switch(keypress){
            case 68 :
                moveRequest.left = (keytype == 'keydown')?-1:0;
                break;
            case 81 :
                moveRequest.left = (keytype == 'keydown')?1:0;
                break;
            case 90:
                moveRequest.top = (keytype == 'keydown')?1:0;
                break;
            case 83:
                moveRequest.top = (keytype == 'keydown')?-1:0;
                break;
        }
    }

    if(keytype == 'keyup'){
        charlie.addClass('stopRunning');
    }

    w.postMessage(moveRequest);

    moveRequest = {
        top:0,
        left:0
    }

});

/*
var mouseMoveTimeOut;
$('.map').on('mousemove', function(e){

    var moveRequest = {
        top:0,
        left:0
    }

    moveRequest.left = (e.offsetX > charlie.position().left) ? -1 : 1;
    moveRequest.top = (e.offsetY > charlie.position().top) ? -1 : 1;
    w.postMessage(moveRequest);

})
*/

//event trigger qui reçoit les messages des workers

w.onmessage = function(event){
    //console.log('worker returned : ', event.data);

    charlie.css('transform', 'translate(' + event.data.left*6 + 'px,' + event.data.top*6 + 'px)');
};

w.onerror = function(error) {
    console.error("Worker error: " + error.message + "\n");
    throw error;
};
