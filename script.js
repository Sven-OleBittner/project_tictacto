let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = generateYellowCross();

function init() {
  render();
}

function render() {
  const gameContainer = document.getElementById("gameContainer");
  let tableHTML =
    '<table id="tableContainer" style="border-collapse: collapse; border: 5px solid transparent;">';

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      const cellIndex = i * 3 + j;
      const cellContent = fields[cellIndex] === null ? "" : fields[cellIndex];
      let cellClass = "";
      if (fields[cellIndex] === "X") {
        cellClass = "red"; // Set 'X' color to red
      } else if (fields[cellIndex] === "O") {
        cellClass = "blue"; // Set 'O' color to blue
      }
      tableHTML += `<td id="${cellIndex}" class="${cellClass}" onclick="makeMove(${cellIndex})">${cellContent}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";

  gameContainer.innerHTML = tableHTML;
}

function makeMove(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    currentPlayer = currentPlayer === generateYellowCross() ? generateCircle() : generateYellowCross();
    render();
    checkGameOver();
  }
}

function generateCircle() {
    const svgWidth = 70;
    const svgHeight = 70;
    const radius = 30; // Radius des Kreises (70px Durchmesser / 2)
    const circleCenter = 35; // Mittelpunkt des Kreises (70px / 2)

    const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${circleCenter}" cy="${circleCenter}" r="${radius}" stroke="#00B0EF" stroke-width="5" fill="none"/>
            <circle cx="${circleCenter}" cy="${circleCenter}" r="${radius}" fill="#00B0EF">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 188.495" 
                    to="188.495, 0" 
                    dur="8s" 
                    repeatCount="indefinite" />
            </circle>
        </svg>
    `;

    return svg;
}
function generateYellowCross() {
  const svg = `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <!-- Diagonale Linie von oben links nach unten rechts -->
          <line x1="0" y1="0" x2="70" y2="70" stroke="#FEC000" stroke-width="10" stroke-linecap="round"/>
          <!-- Diagonale Linie von oben rechts nach unten links -->
          <line x1="70" y1="0" x2="0" y2="70" stroke="#FEC000" stroke-width="10" stroke-linecap="round"/>
      </svg>
  `;

  return svg;
}

// Prüft, ob das Spiel vorbei ist
function checkGameOver() {
  const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
      [0, 4, 8], [2, 4, 6]             // Diagonalen
  ];

  for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          drawWinningLine(a, c);
          return true;
      }
  }
  return false;
}

// Zeichnet eine weiße Linie exakt entlang der siegreichen Felder im Tabellenraster
function drawWinningLine(start, end) {
  const gameContainer = document.getElementById('gameContainer');
  const line = document.createElement('div');
  line.style.position = 'absolute';
  line.style.backgroundColor = 'white';
  line.style.height = '5px';

  const startCell = document.querySelectorAll('td')[start];
  const endCell = document.querySelectorAll('td')[end];

  const startX = startCell.offsetLeft + startCell.offsetWidth / 2;
  const startY = startCell.offsetTop + startCell.offsetHeight / 2;
  const endX = endCell.offsetLeft + endCell.offsetWidth / 2;
  const endY = endCell.offsetTop + endCell.offsetHeight / 2;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  line.style.width = `${Math.sqrt(deltaX * deltaX + deltaY * deltaY)}px`;
  line.style.left = `${startX}px`;
  line.style.top = `${startY}px`;
  line.style.transform = `rotate(${Math.atan2(deltaY, deltaX) * 180 / Math.PI}deg)`;
  line.style.transformOrigin = '0 0';
  line.style.zIndex = '10';

  gameContainer.appendChild(line);
}

function getX(index) {
  return (index % 3) * 100;
}

function getY(index) {
  return Math.floor(index / 3) * 100;
}


function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = generateYellowCross();
  render();
}