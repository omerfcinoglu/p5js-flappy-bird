class Background {
     constructor({image, x, y, width, height, speed}) {
         this.image = image;
         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height;
         this.speed = speed; 
     }
 
     draw() {
         image(this.image, this.x, this.y, this.width, this.height);
     }
 
     update() {

     }
 }
 