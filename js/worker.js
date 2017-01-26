/**
 * Created by POL on 19/01/2017.
 */

//Position initiale du joueur
var player = {
    top:0,
    left:0
}

//demande de déplacement / Objet link
var moveRequest = {
    top : 0,
    left : 0
};

var onmessage = function (event) {
    console.log(event.data);
    moveRequest = event.data;
}

// le tick
var gameTick = function () {
    var nextX = player.left - (moveRequest.left );
    var nextY = player.top - (moveRequest.top);
    player.left = nextX;
    player.top = nextY;
    postMessage(player);

};

self.setInterval(gameTick, 30);
