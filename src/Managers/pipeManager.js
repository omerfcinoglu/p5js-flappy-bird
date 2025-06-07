class PipeManager {
    constructor({pipeCount, gap, gapHeight, pipeWidth, pipeHeight, pipeSpeed}) {
        this.pipes = [];
        this.gap = gap;
        this.gapHeight = gapHeight;
        this.defaultSpeed = pipeSpeed;
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

    updateAndDraw(bird, game, deltaTime) {
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
                pipe.passed = true;
                if (game && typeof game.incrementScore === 'function') {
                    game.incrementScore();
                }
            }

            if (bird) {
                let birdRight = bird.x + bird.width;
                let birdBottom = bird.y + bird.height;

                let collideX = birdRight > pipe.x && bird.x < pipe.x + pipe.width;
                let collideY = bird.y < pipe.topHeight || birdBottom > pipe.bottomY;
                if (collideX && collideY) {
                    if (game && typeof game.gameOver === 'function') {
                        game.gameOver();
                    }
                }
            }
        }
    }

    getMaxPipeX() {
        return Math.max(...this.pipes.map(pipe => pipe.x));
    }

    setSpeed(speed) {
        this.pipes.forEach(pipe => pipe.speed = speed);
    }
}
