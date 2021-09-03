//Array of sprites instead of just one sprite
let sprites = [];

function createAsteroid () {
    return kontra.Sprite({
    //Believe this lets us reuse it?
    type: 'asteroid',
    //gives us x and y position for the center of the circle to start drawing
    x: 100,        
    y: 100,
    //This causes the circle to move. Delta x and y and when you run 
    //asteroid.update the x and y change randomly from 100,100
    //auto makes update do something otherwise it wont do shit
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    //radius of 30
    radius: 30,
    render(){
        this.context.strokeStyle = 'white';
        //position above
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.context.stroke();
    },
  });
}

function degreesToRadians(degrees) {
    return (degrees + Math.PI) / 180;
}

kontra.init();
kontra.initKeys();



//create your user controlled space ship
let ship = kontra.Sprite({
    //x and y position to start drawing from 
    x: 300,
    y: 300,
    //used for collision detection
    width: 6,
    //0 degrees is to the right
    //canvas uses radians where is moves the whole canvas and drawing
    rotation: 0, 
    update(){
        if(kontra.keyPressed('left')){
            this.rotation -= 10;
        }
        if(kontra.keyPressed('right')){
            this.rotation += 10;
        }
        this.advance();
    },
    render(){
        this.context.strokeStyle = 'white';
        this.context.fillStyle = 'white';

        this.context.save();

        this.context.translate(this.x, this.y);
        this.context.rotate(degreesToRadians(this.rotation));

        this.context.beginPath();
        //draw a triangle
        this.context.moveTo(-3, -5);
        this.context.lineTo(12, 0);
        this.context.lineTo(-3, 5);

        this.context.closePath();
        this.context.fill();
        this.context.stroke();

        this.context.restore();
        
    }
});

sprites.push(ship);

//create 4 asteroids
for(let i = 0; i < 4; i++){
    sprites.push(createAsteroid());
}



//#region single asteroid only code. not needed as we moved code into a function
/* create a single asteroid. Changing this code to a function so we can create multiple new sprites and put them in an array
let asteroid = kontra.Sprite({
    //Believe this lets us reuse it?
    type: 'asteroid',
    //gives us x and y position for the center of the circle to start drawing
    x: 100,        
    y: 100,
    //This causes the circle to move. Delta x and y and when you run 
    //asteroid.update the x and y change randomly from 100,100
    //auto makes update do something otherwise it wont do shit
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    //radius of 30
    radius: 30,
    render(){
        this.context.strokeStyle = 'white';
        //position above
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.context.stroke();
    }
  });
*/
//#endregion for asteroid
  
let loop = kontra.GameLoop({
    update(){
        //we want to make the boundaries of the canvas do something
        let canvas = kontra.getCanvas();

        sprites.forEach((sprite) => {
            sprite.update();
            //asteroid is beyond left edge TP right
            if(sprite.x < 0){
                sprite.x = canvas.width;
            }
            //asteroid is beyond right edge TP left
            if(sprite.x > canvas.width){
                sprite.x = 0;
            }
            //asteroid is beyond top edge TP to bot
            if(sprite.y < 0){
                sprite.y = canvas.height;
            }
            //asteroid is beyond bottom edge TP to top
            if(sprite.y > canvas.height){
                sprite.y = 0;
            }
        });
    },
        //#region code for individual asteroid. moved into forEach for sprite array
        /*
        asteroid.update();
        //asteroid is beyond left edge TP right
        if(asteroid.x < 0){
            asteroid.x = canvas.width;
        }
        //asteroid is beyond right edge TP left
        if(asteroid.x > canvas.width){
            asteroid.x = 0;
        }
        //asteroid is beyond top edge TP to bot
        if(asteroid.y < 0){
            asteroid.y = canvas.height;
        }
        //asteroid is beyond bottom edge TP to top
        if(asteroid.y > canvas.height){
            asteroid.y = 0;
        }
        */
       //#endregion
    render(){
        sprites.forEach((s) => s.render());
        //asteroid.render();
    },
  });
  
loop.start();
