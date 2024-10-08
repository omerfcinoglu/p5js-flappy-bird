let bird;
let ground1, ground2;
let backgroundLayer, backgroundImage;
let _textFont;
let pipeImage,pipeManager;

function preload() {
    birdImages = [
      loadImage('assets/yellowbird-midflap.png'),
      loadImage('assets/yellowbird-downflap.png'),
      loadImage('assets/yellowbird-upflap.png')
    ];
    groundImage = loadImage('assets/ground.png');
    backgroundImage = loadImage('assets/background-day.png');

    pipeImage = loadImage('assets/pipe-green.png')
    _textFont = loadFont('assets/fonts/FlappyBirdy.ttf');
}

function setup() {
    createCanvasForGame();
    textFont(_textFont);
    textSize(123);
    fill(255);

    backgroundLayer = new Background(backgroundImage, 0, 0, width, height, 1);

    ground1 = new Ground(groundImage, 0, height - 100, width, 100, 2);
    ground2 = new Ground(groundImage, width, height - 100, width, 100, 2);

    bird = new Bird(birdImages, ((width / 2) - 53), ((height / 2) - 25), 53.1, 50);

    pipeManager = new PipeManager(3, 150, 150, 80 , height, 0.3);
}

function draw() {
    background(220);

    // Arka planı çiz ve güncelle
    backgroundLayer.draw();
    backgroundLayer.update();

    pipeManager.updateAndDraw(deltaTime);

    ground1.draw();
    ground1.update();
    ground1.resetPositionIfOutOfScreen();

    ground2.draw();
    ground2.update();
    ground2.resetPositionIfOutOfScreen();

    // Kuşu çiz ve güncelle
    bird.draw();
    bird.update();

    // Boruları yönet ve çiz
    
    // Başlık yazısı
    textAlign(CENTER, CENTER);
    text('genetic bird', width / 2, 100);
}

function keyPressed() {
    if (key === ' ') {
        bird.fly();
    }
}

function windowResized() {
    createCanvasForGame();

    backgroundLayer.width = width;
    backgroundLayer.height = height;

    ground1.y = height - 100;
    ground2.y = height - 100;
    ground1.width = width;
    ground2.width = width;

    ground1.x = 0;
    ground2.x = ground1.width;
}

function createCanvasForGame() {
    let ratio = 9 / 16;

    // Ekran boyutlarını al
    let availableWidth = windowWidth;
    let availableHeight = windowHeight;

    // 9:16 oranını korumak için uygun boyutları belirle
    let newHeight = availableHeight;
    let newWidth = newHeight * ratio;

    if (newWidth > availableWidth) {
        newWidth = availableWidth;
        newHeight = newWidth / ratio;
    }

    // Canvas boyutlarını ayarla
    resizeCanvas(newWidth, newHeight, true);
}
