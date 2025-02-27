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

function render() {
    const gameContainer = document.getElementById('gameContainer');
    let tableHTML = '<table style="border-collapse: collapse;">';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const cellIndex = i * 3 + j;
            const cellContent = fields[cellIndex] === null ? '' : fields[cellIndex];
            tableHTML += `<td style="width: 100px; height: 100px; border: 1px solid black; text-align: center; vertical-align: middle; font-size: 24px;">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    gameContainer.innerHTML = tableHTML;
}

render();