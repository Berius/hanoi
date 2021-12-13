class Hitbox{
   constructor(x, y, width, height){
     this.x = x;
     this.y = y;
     this.width = width;
     this.height = height;
   }
   drawHitbox(){
     if(!debug){
       noStroke();
     }
     fill(backgroundColor);
     rect(this.x, this.y, this.width, this.height);
   }
   clicked(){
         return (mouseX > this.x) &&
        (mouseX < (this.x + this.width)) &&
        (mouseY > this.y) &&
        (mouseY < (this.y + this.height));
   }
 }

 class Stick{
  constructor(x1, y1, x2, y2, amountOfRings){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.rings = [];
    this.hitbox = new Hitbox(x1-(hitboxWidth/2),y1-hitboxHeight, hitboxWidth,hitboxHeight);
    this.createRings(amountOfRings);
  }
  drawStick(){
    this.hitbox.drawHitbox();
    stroke(0);
    line(this.x1,this.y1,this.x2,this.y2);
    for(let i = 0; i < this.rings.length; i++){
      this.rings[i].drawRing();
    }
  }
  createRings(amountOfRings){
    let width = 200;
    for(let i = 0; i < amountOfRings; i++){
      this.addRing(createRing(width));
      width -= 30;
    }
  }
  numberOfRings(){
    return this.rings;
  }
  addRing(ring){
    this.rings.push(ring);
  }
  peek(){
    return this.rings[this.rings.length-1];
  }
  stickX(){
    return this.x1;
  }
  stickY(){
    return this.y1;
  }
  clicked(){
      if(this.hitbox.clicked()){
        if (currentMovingRing) {
          if(this.rings.length == 0 || this.peek().ringWidth() > currentMovingRing.ringWidth()) {
            this.addRing(currentMovingRing);
            currentMovingRing = null
          }
            else {
              print("nie możesz")
            }
        } else {
          currentMovingRing = this.pop();
        }
    }
  }
  pop(){
    return this.rings.pop();
  }
  updateRings(){
    for (let i = 0; i<this.rings.length;i++){
        this.rings[i].moveRing(this.stickX()-(this.rings[i].ringWidth()/2),this.stickY()-ringHeight);
        ringHeight+=20
    }
    ringHeight=20;
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
    stroke(0);
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
  setWidth(number){
    this.width = number;
  }
  ringWidth(){
    return this.width;
  }
}

let ring = [];
let stick = [];
let button;
let ringWidth = 200;
let ringHeight = 20;
let ringHeightConst = 20;
let ringwidthConst = 200;
let currentMovingRing;
let sticks = 3;
let rings = 7;
let backgroundColor = 150;
let hitboxWidth = 180;
let hitboxHeight = 200;

let debug = false;

function createSticks(){
  stick[0] = new Stick(stickX,600,stickX,400, rings)
  stick[1] = new Stick(stickX+200,600,stickX+200,400,0);
  stick[2] = new Stick(stickX+400,600,stickX+400,400,0);
}

function drawSticks(){
  for (i = 0; i < sticks; i++){
    stick[i].drawStick();
  }
}

function updateStick(){
  for (i = 0; i < sticks; i++){
    stick[i].updateRings();
  }
}

function updateCurrentRing(){
  if(currentMovingRing){
    currentMovingRing.drawRing();
    currentMovingRing.moveRing(mouseX - currentMovingRing.width / 2 ,mouseY - currentMovingRing.height/2);
  }
}

function createRing(width){
    r = random(255);
    g = random(255);
    b = random(255);
    return new Ring(300,300, width, ringHeight);
}

function mouseClicked() {
  for (i = 0; i < sticks; i++){
    stick[i].clicked();
  }
}

function win(){
  if(stick[2].rings.length == rings){
    print("chuj");
  }
}

function setup() {
  createCanvas(800, 600);
  rectX = 200;
  rectY = 20;
  stickX = 200;
  createSticks();
}

function draw() {
  background(backgroundColor);
  drawSticks();
  updateStick();
  updateCurrentRing();
  win();
}
