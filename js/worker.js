/**
 * Created by POL on 19/01/2017.
 */

//Position initiale du joueur
var player = {
    top:0,
    left:0
}

//Coords du joueur
var playerCoords = {
    x:0,
    y:0
}

//Création initiale de la map
var world = {
    map:[],
    player:player,
    playerCoords:playerCoords
};
for(var i=0;i<10;i++){
    world.map.push([]);
    for(var j=0;j<10;j++){
        world.map[i].push( Math.round(Math.random()) );
    }
}

//demande de déplacement / Objet link
var moveRequest = {
    top : 0,
    left : 0
};

var onmessage = function (event) {
    //console.log(event.data);
    moveRequest = event.data;
}

// le tick
var gameTick = function () {
    var nextX = world.player.left - (moveRequest.left );
    var nextY = world.player.top - (moveRequest.top);
    world.player.left = nextX;
    world.player.top = nextY;
    postMessage(world);
};

self.setInterval(gameTick, 200);
