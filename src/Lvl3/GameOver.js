export function displayGameOver(leaderboardData) {
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("game-screen");
    gameScreen.id = "gameScreen";
  
    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Game Over!";
    gameScreen.appendChild(h2);
  
    // Create the leaderboard table
    const leaderboardTable = document.createElement("table");
    leaderboardTable.classList.add("leaderboard-table");
  
    // Create the table header row
    const tableHeaderRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    const timeHeader = document.createElement("th");
    timeHeader.textContent = "Time Lasted";
  
    tableHeaderRow.appendChild(nameHeader);
    tableHeaderRow.appendChild(timeHeader);
  
    leaderboardTable.appendChild(tableHeaderRow);
  
    // Populate the table with leaderboard data
    for (const entry of leaderboardData) {
        const tableRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = entry.name;
        const timeCell = document.createElement("td");
        timeCell.textContent = entry.timeLasted;
  
        tableRow.appendChild(nameCell);
        tableRow.appendChild(timeCell);
  
        leaderboardTable.appendChild(tableRow);
    }
  
    gameScreen.appendChild(leaderboardTable);
  
    // Create the restart button
    const restartButton = document.createElement("button");
    restartButton.id = "restartButton";
    restartButton.textContent = "Restart";
    gameScreen.appendChild(restartButton);
  
    // Create the menu button
    const menuButton = document.createElement("button");
    menuButton.id = "menuButton";
    menuButton.textContent = "Go to Main Menu";
    gameScreen.appendChild(menuButton);
  
    // Add event listeners to buttons (if needed)
  
    // Append the game screen to the body
    document.body.appendChild(gameScreen);
  
    // Create the style element
    const style = document.createElement("style");
    style.textContent = `
      .game-screen {
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #000; /* Dark background for a space theme */
        border: 4px solid #fff;
        padding: 40px;
        text-align: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
        z-index: 9999;
        color: #fff;
        font-family: 'Arial', sans-serif;
      }
  
      .game-screen h2 {
        color: #33ccff; /* Cosmic blue for the heading */
      }
  
      .game-screen button {
        background-color: #33ccff; /* Cosmic blue for buttons */
        color: #fff;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        margin: 10px;
        transition: background-color 0.3s ease;
      }
  
      .game-screen button:hover {
        background-color: #005580; /* Darker blue on hover */
      }
  
      .leaderboard-table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
      }
  
      .leaderboard-table th, .leaderboard-table td {
        border: 1px solid #fff;
        padding: 8px;
        text-align: left;
      }
  
      .leaderboard-table th {
        background-color: #33ccff;
        color: #fff;
      }
  
      .leaderboard-table tr:nth-child(even) {
        background-color: #005580;
      }
  
      .leaderboard-table tr:nth-child(odd) {
        background-color: #33ccff;
      }
    `;
    document.head.appendChild(style);
  
    document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      window.location.href = "game.html";
    });
  
    document
    .getElementById("menuButton")
    .addEventListener("click", function () {
      window.location.href = "index.html";
    });
}