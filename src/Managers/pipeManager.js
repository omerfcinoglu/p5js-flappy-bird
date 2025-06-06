class PipeManager {
    constructor({pipeCount, gap, gapHeight, pipeWidth, pipeHeight, pipeSpeed}) {
        this.pipes = [];
        this.gap = gap;
        this.gapHeight = gapHeight;
        for (let i = 0; i < pipeCount; i++) {
            let x = width + i * (300);
            let pipeProps = {
              x : x,
              gap : gapHeight,
              width: pipeWidth,
              height : pipeHeight,
              speed : pipeSpeed
            };
            this.pipes.push(new Pipe(pipeProps));
        }
    }

    updateAndDraw(bird, deltaTime) {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            let pipe = this.pipes[i];
            pipe.draw();
            pipe.update(deltaTime);

            if (pipe.isOffScreen()) {
                let newX = width + (300);
                pipe.passed = false;
                pipe.resetPosition(newX);
            }

            if (bird && !pipe.passed && pipe.x + pipe.width < bird.x) {
                console.log("skor arttır");
                pipe.passed = true;
            }
        }
    }

    getMaxPipeX() {
        return Math.max(...this.pipes.map(pipe => pipe.x));
    }
}
