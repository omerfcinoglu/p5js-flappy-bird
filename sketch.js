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

  backgroundLayer = new Background({
      image: backgroundImage,
      x: 0,
      y: 0,
      width: width,
      height: height,
      speed: 1
  });

  ground1 = new Ground({
      image: groundImage,
      x: 0,
      y: height - 100,
      width: width,
      height: 100,
      speed: 2
  });

  ground2 = new Ground({
      image: groundImage,
      x: width,
      y: height - 100,
      width: width,
      height: 100,
      speed: 2
  });

  bird = new Bird({
      images: birdImages,
      x: (width / 2) - 53,
      y: (height / 2) - 25,
      width: 55,
      height: 50
  });

  pipeManager = new PipeManager({
      pipeCount: 3,
      gap: 150,
      gapHeight: 150,
      pipeWidth: 80,
      pipeHeight: height,
      pipeSpeed: 0
  });
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
