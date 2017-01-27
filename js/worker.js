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

    set bearing(bearing){
        this.orientation = bearing;
    }

    get bearing(){
        return (this.orientation);
    }
}

//Position initiale du joueur
let player = new Entity('player', 0, 0);
let bot1 = new Entity('ennemy', 5, 5);
let bot2 = new Entity('ennemy', 5, 6);



//Création initiale de la map
let world = {
    map:[],
    listPlayer:[player,bot1,bot2],
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
    let sMoveRequest = {
        top:0,
        left:0
    }

    //Simulation des moveRequest pour les bots
    for(let i=0;i<world.listPlayer.length;i++){
        if(world.listPlayer[i].class == 'ennemy'){

            sMoveRequest.left = Math.floor(Math.random()*3 )-1 ;
            sMoveRequest.top = Math.floor(Math.random()*3 )-1 ;


            let nextX = world.listPlayer[i].position[0] - (sMoveRequest.left );
            let nextY = world.listPlayer[i].position[1] - (sMoveRequest.top);
            //Math.max(Math.min(nextX,9), 0);
            world.listPlayer[i].position = [Math.max(Math.min(nextX,9), 0), Math.max(Math.min(nextY,9), 0)];

            if(sMoveRequest.left > 0){
                world.listPlayer[i].bearing = 'left';
            }
            if(sMoveRequest.left < 0){
                world.listPlayer[i].bearing = 'right';
            }
            if(sMoveRequest.top > 0){
                world.listPlayer[i].bearing = 'top';
            }
            if(sMoveRequest.top < 0){
                world.listPlayer[i].bearing = 'bottom';
            }
        }

    }

    if(moveRequest.left > 0){
        world.listPlayer[0].bearing = 'left';
    }
    if(moveRequest.left < 0){
        world.listPlayer[0].bearing = 'right';
    }
    if(moveRequest.top > 0){
        world.listPlayer[0].bearing = 'top';
    }
    if(moveRequest.top < 0){
        world.listPlayer[0].bearing = 'bottom';
    }


    var nextX = world.listPlayer[0].position[0] - (moveRequest.left );
    var nextY = world.listPlayer[0].position[1] - (moveRequest.top);
    world.listPlayer[0].position = [Math.max(Math.min(nextX,9), 0), Math.max(Math.min(nextY,9), 0)];

    //Detection des colisions
    for(let i=1;i<world.listPlayer.length;i++){
        console.log(world.listPlayer[i].position);
    }

    postMessage(world);


};

self.setInterval(gameTick, 200);
