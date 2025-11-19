let sports = [];
let currentQ = null;
let inputBox;
let score = 0;
let feedback = "";
let particles = [];
let level = 1;
let maxLevel = 3;

function setup() {
  let canvas = createCanvas(900, 550);
  canvas.parent("sketch-container");
  textFont("Poppins");

  inputBox = createInput("");
  inputBox.position(40, height - 50);
  inputBox.size(230);
  inputBox.style("padding", "10px");
  inputBox.style("border-radius", "10px");
  inputBox.style("border", "2px solid #2e67f8");
  inputBox.style("font-size", "16px");

  loadLevel(level);
}

function loadLevel(lv) {
  sports = [];

  if (lv === 1) {
    sports = [
      { name: "Sepak Bola", icon: "⚽", x: 150, y: 200, dx: 2, dy: 1.5 },
      { name: "Bulu Tangkis", icon: "🏸", x: 350, y: 250, dx: -2, dy: 1 },
      { name: "Basket", icon: "🏀", x: 550, y: 150, dx: 1.5, dy: 2 }
    ];
  }

  if (lv === 2) {
    sports = [
      { name: "Renang", icon: "🏊", x: 750, y: 300, dx: 2, dy: 1.5 },
      { name: "Tinju", icon: "🥊", x: 750, y: 300, dx: -2, dy: -2 },
      { name: "Rugby", icon: "🏈", x: 750, y: 300, dx: 1.5, dy: 2 }
    ];
  }

  if (lv === 3) {
    sports = [
      { name: "Catur", icon: "♟️", x: 150, y: 200, dx: 2, dy: 1.5 },
      { name: "Berkuda", icon: "🏇", x: 350, y: 250, dx: -2, dy: -2 },
      { name: "Golf", icon: "🏌️‍♂️", x: 550, y: 150, dx: 3, dy: 3.5 },
      { name: "Voli", icon: "🏐", x: 450, y: 350, dx: 2.5, dy: 3 },
      { name: "Tenis", icon: "🎾", x: 250, y: 150, dx: -2.5, dy: 2.5 }
    ];
  }
}

function draw() {
  setGradientBackground();

  drawUIPanel();
  drawScoreAndLevel();

  for (let s of sports) {
    s.x += s.dx;
    s.y += s.dy;

    if (s.x < 50 || s.x > width - 50) s.dx *= -1;
    if (s.y < 80 || s.y > height - 50) s.dy *= -1;

    let d = dist(mouseX, mouseY, s.x, s.y);
    let size = (d < 40) ? 60 : 48;

    push();
    translate(s.x, s.y);
    if (d < 40) {
      scale(1.2);
      textSize(size);
      fill(255);
      text(s.icon, 0, 0);
    } else {
      textSize(size);
      fill(255);
      text(s.icon, 0, 0);
    }
    pop();
  }

  updateParticles();

  if (currentQ) drawQuestionCard();

  fill(255);
  textSize(16);
  text(feedback, 40, height - 70);
}

function mousePressed() {
  for (let s of sports) {
    let d = dist(mouseX, mouseY, s.x, s.y);
    if (d < 40) askQuestion(s);
  }
}

function askQuestion(sport) {
  currentQ = {
    sport,
    text: "Nama olahraga apa ini? (Contoh: Sepak Bola, Bulu Tangkis, Basket, Renang, Voli, Tenis)"
  };
  feedback = "";
}

function keyPressed() {
  if (keyCode === ENTER && currentQ) {
    let ans = inputBox.value().trim().toLowerCase();
    let correct = currentQ.sport.name.toLowerCase();

    if (ans === correct) {
      score++;
      feedback = `Benar! Ini adalah ${currentQ.sport.name}. +1 skor`;
      spawnParticles(currentQ.sport.x, currentQ.sport.y);

      if (score % 3 === 0 && level < maxLevel) {
        level++;
        loadLevel(level);
        feedback = `Level naik ke ${level}!`;
      }
    } else {
      feedback = `Salah. Ini adalah ${currentQ.sport.name}.`;
    }

    currentQ = null;
    inputBox.value("");
  }
}
}

// ================== UI COMPONENTS ==================
function drawUIPanel() {
  fill(255, 255, 255, 110);
  noStroke();
  rect(20, 20, 260, 120, 18);
}

function drawScoreAndLevel() {
  fill(20);
  textSize(26);
  text(Skor: ${score}, 35, 60);

  fill(255);
  textSize(18);
  stroke(30, 80, 255);
  strokeWeight(2);
  fill(30, 80, 255);
  rect(35, 80, 120, 35, 10);
  noStroke();
  fill(255);
  text(Level ${level}, 65, 103);
}

function drawQuestionCard() {
  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(width - 330, 30, 300, 160, 15);
  noStroke();
  fill(0);
  textSize(20);
  text("Tebak Cabang Olahraga", width - 315, 65);
  textSize(14);
  text(currentQ.text, width - 315, 100, 260);
}
// ================== ANIMASI BACKGROUND ==================
function setGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#4aa3ff'), color('#004d99'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
