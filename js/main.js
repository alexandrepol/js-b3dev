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
        let bot1 = event.data.listPlayer[1];
        let bot2 = event.data.listPlayer[2];

        if($("#"+bot1.id).length == 0){
            world.append("<span id='"+bot1.id+"'class='"+bot1.class+" stopRunning'></span>");
        }
        if($("#"+bot2.id).length == 0){
            world.append("<span id='"+bot2.id+"'class='"+bot2.class+" stopRunning'></span>");
        }

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
    /*Mouvements des robots*/
    $("#"+bot1.id).removeClass("top left right bottom");
    $("#"+bot2.id).removeClass("top left right bottom");
    $("#"+bot1.id).css('transform', 'translate(' + event.data.listPlayer[1].x*32 + 'px,' + event.data.listPlayer[1].y*32 + 'px)');
    $("#"+bot2.id).css('transform', 'translate(' + event.data.listPlayer[2].x*32 + 'px,' + event.data.listPlayer[2].y*32 + 'px)');
    $("#"+bot1.id).addClass(bot1.orientation);
    $("#"+bot2.id).addClass(bot2.orientation);


    charlie.removeClass("top left right bottom");
    charlie.css('transform', 'translate(' + event.data.listPlayer[0].x*32 + 'px,' + event.data.listPlayer[0].y*32 + 'px)');
    charlie.addClass(event.data.listPlayer[0].orientation);

};

w.onerror = function(error) {
    console.error("Worker error: " + error.message + "\n");
    throw error;
};
