/**
 * Created by POL on 19/01/2017.
 */

//Instance du worker

    var w = new Worker("js/worker.js");

//Sprite
var charlie = $('.player');
var world = $('.map');
var moveRequest = {
    top:0,
    left:0
}

//Clavier
$("#viewport").on("keydown keyup", function(e){
    var keypress = e.keyCode;
    var keytype = e.type;
    charlie.removeClass('stopRunning');

    //Recupere les saisies
    if([68,81,83,90].indexOf(keypress) != -1){
        switch(keypress){
            case 68 :
                charlie.removeClass('top left bottom');
                moveRequest.left = (keytype == 'keydown')?-1:0;
                charlie.addClass('right');
                break;
            case 81 :
                charlie.removeClass('top right bottom');
                moveRequest.left = (keytype == 'keydown')?1:0;
                charlie.addClass('left');
                break;
            case 90:
                charlie.removeClass('left right bottom');
                moveRequest.top = (keytype == 'keydown')?1:0;
                charlie.addClass('top');
                break;
            case 83:
                charlie.removeClass('top left right');
                moveRequest.top = (keytype == 'keydown')?-1:0;
                charlie.addClass('bottom');
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
        //Affiche la map
        $('.row').remove();
        for(var i=0;i<event.data.map.length;i++){
            world.append("<div class='row'></div>");
            for(var n=0;n<10;n++){
                switch (event.data.map[i][n]){
                    case 0:
                        $('.row').eq(i).append("<div class='grass'></div>");
                        break;
                    case 1:
                        $('.row').eq(i).append("<div class='rock'></div>");
                    break;
                }
            }
        }
    charlie.css('transform', 'translate(' + event.data.player.left*32 + 'px,' + event.data.player.top*32 + 'px)');

};

w.onerror = function(error) {
    console.error("Worker error: " + error.message + "\n");
    throw error;
};
