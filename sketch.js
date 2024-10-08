let bird;
let ground1, ground2;
let backgroundLayer;


function preload() {
    birdImages = [
      loadImage('assets/yellowbird-midflap.png'),
      loadImage('assets/yellowbird-downflap.png'),
      loadImage('assets/yellowbird-upflap.png')
    ];
    groundImage = loadImage('assets/ground.png');
    backgroundImage = loadImage('assets/background-day.png');
}

function setup() {
    createCanvasForGame();

    // Arka planı, zemini ve kuşu oluştur
    backgroundLayer = new Background(backgroundImage, 0, 0, width, height, 1);

    // İlk zemin ekranın başlangıcında, ikinci zemin hemen ardında olacak şekilde yerleştiriliyor
    ground1 = new Ground(groundImage, 0, height - 100, width, 100, 2);
    ground2 = new Ground(groundImage, width, height - 100, width, 100, 2);

    bird = new Bird(birdImages, 100, height / 2, 42,40);
}

function draw() {
    background(220);

    // Arka planı çiz ve güncelle
    backgroundLayer.draw();
    backgroundLayer.update();

    // Zemini çiz ve güncelle
    ground1.draw();
    ground1.update();
    ground1.resetPositionIfOutOfScreen();

    ground2.draw();
    ground2.update();
    ground2.resetPositionIfOutOfScreen();

    bird.draw();
    bird.update();
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
