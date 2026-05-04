const grid = document.getElementById("grid");
const selectedDiv = document.getElementById("selected");
const timerDiv = document.getElementById("timer");
const resultDiv = document.getElementById("result");
const balanceDiv = document.getElementById("balance");
const historyDiv = document.getElementById("history");
const betInput = document.getElementById("betAmount");
const placeBetBtn = document.getElementById("placeBet");

let cells = [];
let selectedNumbers = [];
let balance = 100;
let bet = 0;
let timeLeft = 60;
let history = [];

// MULTIPLIER TABLE (like screenshot)
const multipliers = {
  2: 2,
  3: 50,
  4: 200,
  5: 500,
  6: 1000
};

// CREATE GRID 1-80
for (let i = 1; i <= 80; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.innerText = i;

  cell.addEventListener("click", () => {
    if (timeLeft < 5) return; // lock during draw
    if (selectedNumbers.includes(i)) {
      selectedNumbers = selectedNumbers.filter(n => n !== i);
      cell.classList.remove("selected");
    } else {
      if (selectedNumbers.length >= 10) return;
      selectedNumbers.push(i);
      cell.classList.add("selected");
    }
    selectedDiv.innerText = "Selected: " + selectedNumbers.join(", ");
  });

  grid.appendChild(cell);
  cells.push(cell);
}

// PLACE BET
placeBetBtn.addEventListener("click", () => {
  bet = parseInt(betInput.value);
  if (bet <= 0 || bet > balance) {
    alert("Invalid bet");
    return;
  }
  alert(`Bet of ${bet} ETB placed!`);
});

// TIMER LOOP
setInterval(() => {
  timeLeft--;
  timerDiv.innerText = "Time: " + timeLeft;

  if (timeLeft === 0) {
    playRound();
    timeLeft = 60;
  }
}, 1000);

// DRAW 20 RANDOM NUMBERS
function drawNumbers() {
  let numbers = [];
  while (numbers.length < 20) {
    let n = Math.floor(Math.random() * 80) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }
  return numbers;
}

// PLAY ROUND
function playRound() {
  if (bet === 0) {
    resultDiv.innerText = "No bet placed!";
    return;
  }

  // Reset styles
  cells.forEach(c => c.classList.remove("drawn", "match", "selected"));

  const drawn = drawNumbers();
  animateDraw(drawn);
  let matches = selectedNumbers.filter(n => drawn.includes(n));
  let multiplier = multipliers[matches.length] || 0;
  let win = bet * multiplier;

  balance = balance - bet + win;
  balanceDiv.innerText = `Balance: ${balance} ETB`;

  resultDiv.innerText = `Drawn: ${drawn.join(", ")} | Matches: ${matches.length} | Win: ${win} ETB`;

  // Highlight drawn & matched numbers
  drawn.forEach(n => cells[n - 1].classList.add("drawn"));
  matches.forEach(n => cells[n - 1].classList.add("match"));

  // Update history dots
  history.unshift(drawn.join(", "));
  if (history.length > 10) history.pop();
  historyDiv.innerText = "History: " + history.join(" | ");

  // reset bet and selection
  selectedNumbers = [];
  bet = 0;
}

// SIMPLE ANIMATION FUNCTION
function animateDraw(numbers) {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= numbers.length) {
      clearInterval(interval);
      return;
    }
    const num = numbers[i];
    cells[num - 1].classList.add("drawn");
    setTimeout(() => cells[num - 1].classList.remove("drawn"), 500);
    i++;
  }, 200);
                        }
