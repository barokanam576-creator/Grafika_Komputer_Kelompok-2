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

// ================== UI COMPONENTS ==================
function drawUIPanel() {
  fill(255, 150);
  rect(20, 20, width - 40, height - 40, 20);
}

function drawScoreAndLevel() {
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text(`Skor: ${score}`, 40, 50);
  text(`Level: ${level}`, width - 140, 50);
}

function drawQuestionCard() {
  fill(0, 200);
  rect(width / 2 - 200, height / 2 - 75, 400, 150, 15);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(currentQ.text, width / 2, height / 2 - 20);
}

function setGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(46, 103, 248), color(2, 0, 36), inter);
    stroke(c);
    line(0, y, width, y);
  } 
}

function spawnParticles(x, y) {
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(x, y));
  }
}
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}


// ================== PARTIKEL ==================
function spawnParticles(x, y) {
  for (let i = 0; i < 25; i++) {
    particles.push({
      x: x,
      y: y,
      dx: random(-3, 3),
      dy: random(-3, 3),
      life: 40
    });
  }
}

function updateParticles() {
  for (let p of particles) {
    fill(255, 240, 0, p.life * 6);
    noStroke();
    ellipse(p.x, p.y, 10);

    p.x += p.dx;
    p.y += p.dy;
    p.life--;
  }

  particles = particles.filter(p => p.life > 0);
}
// ...existing code...
