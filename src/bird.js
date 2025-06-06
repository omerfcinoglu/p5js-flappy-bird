class Bird {
     constructor({images, x, y, width, height}) {
         this.images = images;  // Kuşun animasyon kareleri (görselleri)
         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height;
         this.velocity = 0;  // Kuşun düşme hızı
         this.gravity = 0.2; 
         this.lift = -5;    

         this.frameIndex = 0;  
         this.frameDelay = 8;  
         this.frameCounter = 0; 
     }
 
     draw() {
         image(this.images[this.frameIndex], this.x, this.y, this.width, this.height);// Kullanıcı zıplama komutu verdiğinde yukarı doğru kuvvet uygula
     }
 
     update() {
         this.velocity += this.gravity;
         this.y += this.velocity;
 
         if (this.y > height - this.height) {
             this.y = height - this.height;
             this.velocity = 0;
         }
 
         if (this.y < 0) {
             this.y = 0;
             this.velocity = 0;
         }

         this.isGrounded();
 
         this.frameCounter++;
         if (this.frameCounter >= this.frameDelay) {
             this.frameCounter = 0;
             this.frameIndex = (this.frameIndex + 1) % this.images.length;
         }
     }
 
     fly() {
        this.velocity = 0;
         this.velocity += this.lift; 
     }

    isGrounded(){
       if (this.y + this.height >= height - Ground.HEIGHT) {
           this.y = height - Ground.HEIGHT - this.height;
           this.velocity = 0;
       }
    }
}
 