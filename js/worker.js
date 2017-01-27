/**
 * Created by POL on 19/01/2017.
 */

class Entity{
    constructor(className, posX, posY) {
        this.class = className;
        this.position = [posX, posY];
        this.id = "Entity" + Math.round(Math.random() * 65000);
    }

    set position(position) {
        this.x = position[0];
        this.y = position[1];
    }

    get position() {
        return ([this.x, this.y]);
    }
}

//Position initiale du joueur
let player = new Entity('player', 0, 0);

//Création initiale de la map
let world = {
    map:[],
    player:player,
};
for(var i=0;i<10;i++){
    world.map.push([]);
    for(var j=0;j<10;j++){
        world.map[i].push( Math.round(Math.random()) );
    }
}

//demande de déplacement / Objet link
let moveRequest = {
    top : 0,
    left : 0
};

onmessage = function (event) {
    //console.log(event.data);
    moveRequest = event.data;
}

// le tick
let gameTick = function () {
    //console.log(world.player);
    var nextX = world.player.position[0] - (moveRequest.left );
    var nextY = world.player.position[1] - (moveRequest.top);
    world.player.position = [nextX, nextY];
    postMessage(world);
};

self.setInterval(gameTick, 200);
