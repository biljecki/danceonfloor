
class Obstacle {
  constructor(id, posX, posY) {
      this.id = id;  

      this.posX = posX;
      this.posY = posY;
      
      
      //this.posY = Math.round(Math.random()) * 60;
      this.width = 100;
      this.height = 100;
  }

  generateHTML(){
   return `<div class="obstacle" style="left:${this.posX}px;bottom:${this.posY}px"><h1>${this.id}</h1></div>`
  }
}