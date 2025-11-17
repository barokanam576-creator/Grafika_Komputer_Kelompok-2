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

