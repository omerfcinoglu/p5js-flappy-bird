// Game class to handle main game loop and state
class Game {
  constructor() {
    this.state = 'start';
    this.initializeObjects();
  }

  initializeObjects() {
    // background layer
    this.backgroundLayer = new Background({
      image: backgroundImage,
      x: 0,
      y: 0,
      width: width,
      height: height,
      speed: 1,
    });

    // ground layers
    this.ground1 = new Ground({
      image: groundImage,
      x: 0,
      y: height - 100,
      width: width,
      height: 100,
      speed: 2,
    });

    this.ground2 = new Ground({
      image: groundImage,
      x: width,
      y: height - 100,
      width: width,
      height: 100,
      speed: 2,
    });

    this.bird = new Bird({
      images: birdImages,
      x: width / 2 - 53,
      y: height / 2 - 25,
      width: 55,
      height: 50,
    });

    this.pipeManager = new PipeManager({
      pipeCount: 3,
      gap: 150,
      gapHeight: 150,
      pipeWidth: 80,
      pipeHeight: height,
      pipeSpeed: 0,
    });
  }

  setup() {
    createCanvasForGame();
    textFont(_textFont);
    textSize(123);
    fill(255);

    // resize objects to new canvas size
    this.initializeObjects();
  }

  reset() {
    this.state = 'start';
    this.initializeObjects();
  }

  draw() {
    background(220);

    if (this.state === 'start') {
      this.drawStart();
    } else if (this.state === 'playing') {
      this.drawGame();
    } else if (this.state === 'gameover') {
      this.drawGame();
      this.drawGameOver();
    }
  }

  drawGame() {
    this.backgroundLayer.draw();
    this.backgroundLayer.update();

    this.pipeManager.updateAndDraw(this.bird, deltaTime);

    this.ground1.draw();
    this.ground1.update();
    this.ground1.resetPositionIfOutOfScreen();

    this.ground2.draw();
    this.ground2.update();
    this.ground2.resetPositionIfOutOfScreen();

    this.bird.draw();
    this.bird.update();

    if (this.bird.y + this.bird.height >= height - 100) {
      this.state = 'gameover';
    }

    textAlign(CENTER, CENTER);
    text('genetic bird', width / 2, 100);
  }

  drawStart() {
    this.drawGame();
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Press SPACE to start', width / 2, height / 2);
    textSize(123);
  }

  drawGameOver() {
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Game Over - Press R to restart', width / 2, height / 2 + 50);
    textSize(123);
  }
}
