class Ground {
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
         this.x -= this.speed;
     }
 
    resetPositionIfOutOfScreen() {
        if (this.x <= -this.width) {
            this.x += this.width * 2;
        }
    }
}

// Default height of the ground graphic
Ground.HEIGHT = 100;

 