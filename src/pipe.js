class Pipe {
     constructor(x, gap, width, height, speed) {
         this.x = x;                  // Boruların x koordinatı (ekranın sağından başlar)
         this.gapHeight = gap;        // Boşluğun yüksekliği
         this.width = width;            // Borunun genişliği sabit (160 birim)
         this.height = height;           // Borunun yüksekliği sabit (160 birim)
         this.speed = speed;          // Borunun hareket hızı
 
         // Üst borunun yüksekliğini rastgele belirle
         this.topHeight = random(100, this.height - this.gapHeight - 150);
         this.bottomY = this.topHeight + this.gapHeight;  // Alt borunun başlangıç y koordinatı
     }
 
     draw() {
         // Üst boruyu çiz (ters çevirmek için `scale` kullanıyoruz)
         push();
         translate(this.x, this.topHeight);  // Üst borunun başlangıç noktasına taşın
         scale(1, -1);                       // Y ekseninde ters çevir
         image(pipeImage, 0, 0, this.width, this.height);
         pop();
 
         // Alt boruyu çiz (normal çizim)
         image(pipeImage, this.x, this.bottomY, this.width, this.height - this.bottomY);
     }
 
     update() {
         // Borular sola doğru hareket eder
         this.x -= this.speed * deltaTime ;
     }
 
     isOffScreen() {
         // Eğer borular ekranın solundan çıktıysa, true döndür
         return this.x < -this.width;
     }
 
     resetPosition(newX) {
         this.x = newX;
         this.topHeight = random(100, this.height - this.gapHeight - 150);
         this.bottomY = this.topHeight + this.gapHeight;
     }
 }
 