let game;
let backgroundImage;
let groundImage;
let birdImages;
let _textFont;
let pipeImage;

function preload() {
    birdImages = [
      loadImage('assets/yellowbird-midflap.png'),
      loadImage('assets/yellowbird-downflap.png'),
      loadImage('assets/yellowbird-upflap.png')
    ];
    groundImage = loadImage('assets/ground.png');
    backgroundImage = loadImage('assets/background-day.png');

    pipeImage = loadImage('assets/pipe-green.png');
    _textFont = loadFont('assets/fonts/FlappyBirdy.ttf');
}

function setup() {
    game = new Game();
    game.setup();
}

function draw() {
    game.draw();
}

function keyPressed() {
    if (key === ' ') {
        if (game.state === 'start') {
            game.state = 'playing';
        } else if (game.state === 'playing') {
            game.bird.fly();
        }
    }

    if ((key === 'r' || key === 'R') && game.state === 'gameover') {
        game.reset();
    }
}

function windowResized() {
    game.setup();
}

function createCanvasForGame() {
    let ratio = 9 / 16;

    let availableWidth = windowWidth;
    let availableHeight = windowHeight;

    let newHeight = availableHeight;
    let newWidth = newHeight * ratio;

    if (newWidth > availableWidth) {
        newWidth = availableWidth;
        newHeight = newWidth / ratio;
    }
    resizeCanvas(newWidth * 0.5, newHeight * 0.5, true);
}
