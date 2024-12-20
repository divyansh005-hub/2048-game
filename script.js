window.onload = function() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
};
