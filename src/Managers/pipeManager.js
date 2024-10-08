class PipeManager {
     constructor(pipeCount, gap, gapHeight, pipeWidth, pipeHeight, pipeSpeed) {
         this.pipes = [];
         this.gap = gap;
         this.gapHeight = gapHeight;
 
         // Boruları oluştur ve başlangıç konumlarına yerleştir
         for (let i = 0; i < pipeCount; i++) {
             let x = width + i * (300);
             this.pipes.push(new Pipe(x, gapHeight, pipeWidth , pipeHeight,  pipeSpeed));
         }
     }
 
     updateAndDraw(deltaTime) {
         for (let i = this.pipes.length - 1; i >= 0; i--) {
             let pipe = this.pipes[i];
             pipe.draw();
             pipe.update(deltaTime);
 
             // Eğer boru ekrandan çıktıysa onu yeniden konumlandır
             if (pipe.isOffScreen()) {
                 let newX = width + (300);
                 pipe.passed = false;
                 pipe.resetPosition(newX);
             }
 
             // Kuş boru boşluğundan geçtiyse skoru artır
             if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                 console.log("skor arttır");
                 pipe.passed = true; // Bu borudan sadece bir kez geçildiğini işaretle
             }
         }
     }
 
     getMaxPipeX() {
         return Math.max(...this.pipes.map(pipe => pipe.x));
     }
 }
 