 class Stick{
  constructor(x1,y1,x2,y2, rings){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.rings = rings;
  }
  drawStick(){
    line(this.x1,this.y1,this.x2,this.y2);
  }
  numberOfRings(){
    return this.rings;
  }
  addRing(){
    this.rings++;
  }
  stickX(){
    return this.x1;
  }
  stickY(){
    return this.y1;
  }
}

class Ring{
  constructor(x, y ,width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.col = color(r,g,b);

  }
  drawRing(){
    fill(this.col)
    rect(this.x,this.y,this.width,this.height)
  }

  moveRing(x,y){
    this.x = x;
    this.y = y;
  }
  ringHeight(){
    return this.height;
  }
  changeWidth(number){
    this.width -= number;
  }
  ringWidth(){
    return this.width;
  }
  clicked(){
        return (mouseX > this.x) &&
       (mouseX < (this.x*this.width)) &&
       (mouseY > this.y) &&
       (mouseY < (this.y * this.height))
  }

}

let ring = []
let stick =[]
ringWidth = 200;
ringHeight = 20;
ringHeightConst = 20;
ringwidthConst = 200;
currentMovingRing = 0;
widthToSubtract = 30;
sticks = 3;
ringToMove = 0;
mouseIsBusy = false;
rings=3;

function drawSticks(){
  for (let i = 0; i<sticks;i++){
    stick[i].drawStick();
  }
}

function drawRings(){
  for (let i = 0; i<rings;i++){
      ring[i].drawRing();
  }
}

function mouseReleased() {
  ringToMove=0;
}

function tripleRing(){
  setTimeout(() => {
    ring[2].moveRing(stick[2].stickX()-(ring[2].ringWidth()/2),height-ringHeightConst);
    }, 1000);
   setTimeout(() => {
     ring[1].moveRing(stick[1].stickX()-(ring[1].ringWidth()/2),height-ringHeightConst);
    }, 2000);
   setTimeout(() => {
     ring[2].moveRing(stick[1].stickX()-(ring[2].ringWidth()/2),height-ringHeightConst*2);
    }, 3000);
  setTimeout(() => {
      ring[0].moveRing(stick[2].stickX()-(ring[0].ringWidth()/2),height-ringHeightConst);
    }, 4000);
  setTimeout(() => {
      ring[2].moveRing(stick[0].stickX()-(ring[2].ringWidth()/2),height-ringHeightConst);
    }, 5000);
  setTimeout(() => {
      ring[1].moveRing(stick[2].stickX()-(ring[1].ringWidth()/2),height-ringHeightConst*2);
    }, 6000);
  setTimeout(() => {
      ring[2].moveRing(stick[2].stickX()-(ring[2].ringWidth()/2),height-ringHeightConst*3);
    }, 7000);
}

function fourRings(){
  rings = 4;
}

function reset(){

}

let button;
let button2;
let button3;

function setup() {
  createCanvas(800, 600);
  rectX = 200;
  rectY = 20;
  stickX = 200;
  button = createButton("solve!");
  button.position(100,100);
  button.size(100,60);
  button.mousePressed(tripleRing);

  // button2 = createButton("4 Rings");
  // button2.position(300,100);
  // button2.size(100,60);
  // button2.mousePressed(fourRings)
  //
  // button3 = createButton("Reset");
  // button3.position(600,100);
  // button3.size(100,60);
  // button3.mousePressed(reset);

  for(let i = 0; i<3;i++){
    stick[i] = new Stick(stickX,600,stickX,400,0);
    stickX+=200;
  }
  for (let i = 0; i<rings;i++){
    r = random(255);
    g = random(255);
    b = random(255);
    ring[i] = new Ring(300,300, ringWidth, ringHeight);
  }
  stick[0].addRing();
  stick[0].addRing();
  stick[0].addRing();

 for (let i = 0; i<rings;i++){
      ring[i].moveRing(stick[0].stickX()-(ringWidth/2)+(widthToSubtract/2),stick[0].stickY()-ringHeight);
      ring[i].changeWidth(widthToSubtract);
      widthToSubtract+=30
      ringHeight+=20
  }
}

function draw() {
  background(150);
  drawSticks();
  drawRings();
  if(mouseIsPressed){
      for (let i = 0; i<rings;i++){
      if(ring[i].clicked()==true){
        ringToMove = ring.indexOf(ring[i]);
        mouseIsBusy = true;
      }
    }
    //  ring[ringToMove].moveRing(mouseX,mouseY);
  }

}
