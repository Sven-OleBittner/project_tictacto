let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'X';

function init() {
    render();
}

function render() {
    const gameContainer = document.getElementById('gameContainer');
    let tableHTML = '<table style="border-collapse: collapse;">';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const cellIndex = i * 3 + j;
            const cellContent = fields[cellIndex] === null ? '' : fields[cellIndex];
            tableHTML += `<td onclick="makeMove(${cellIndex})" style="width: 100px; height: 100px; text-align: center; vertical-align: middle; font-size: 24px; cursor: pointer;">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    gameContainer.innerHTML = tableHTML;
}

function makeMove(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        render();
    }
}

render();