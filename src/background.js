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
        if (this.x + this.width < width) {
            image(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    update() {
        this.x -= this.speed * deltaTime;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }
}
 