class Pipe {
      constructor({x, gap, width, height, speed}) {
        this.x = x;                  // Boruların x koordinatı (ekranın sağından başlar)
        this.gapHeight = gap;        // Boşluğun yüksekliği
        this.width = width;            // Borunun genişliği sabit (160 birim)
        this.height = height;           // Borunun yüksekliği sabit (160 birim)
        this.speed = speed;          // Borunun hareket hızı
        this.passed = false;        // Skor için geçilip geçilmediğini takip eder
 
         this.topHeight = random(100, this.height - this.gapHeight - 150);
         this.bottomY = this.topHeight + this.gapHeight;  // Alt borunun başlangıç y koordinatı
     }
 
     draw() {
         push();
         translate(this.x, this.topHeight);  // Üst borunun başlangıç noktasına taşın
         scale(1, -1);                       // Y ekseninde ters çevir
         image(pipeImage, 0, 0, this.width, this.height);
         pop();
 
         image(pipeImage, this.x, this.bottomY, this.width, this.height - this.bottomY);
     }
 
     update() {
         this.x -= this.speed * deltaTime ;
     }
 
     isOffScreen() {
         return this.x < -this.width;
     }
 
     resetPosition(newX) {
         this.x = newX;
         this.topHeight = random(100, this.height - this.gapHeight - 150);
         this.bottomY = this.topHeight + this.gapHeight;
     }
 }
 