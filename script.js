async function searchPlayer() {
    const name = document.getElementById('playerInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "🔍 Searching...";

    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
        const data = await response.json();

        if (data.player) {
            // Filter for American Football only
            const nflPlayers = data.player.filter(p => p.strSport === "American Football");

            if (nflPlayers.length === 1) {
                // Only one player found, show them immediately
                displayPlayer(nflPlayers[0]);
            } else if (nflPlayers.length > 1) {
                // Multiple players found, show a list
                resultDiv.innerHTML = `<h3>Multiple players found. Did you mean?</h3>`;
                nflPlayers.forEach(p => {
                    const btn = document.createElement('button');
                    btn.className = "suggestion-btn";
                    btn.innerText = `${p.strPlayer} (${p.strTeam})`;
                    btn.onclick = () => displayPlayer(p);
                    resultDiv.appendChild(btn);
                });
            } else {
                resultDiv.innerHTML = "❌ No NFL player found.";
            }
        } else {
            resultDiv.innerHTML = "❌ Player not found.";
        }
    } catch (e) {
        resultDiv.innerHTML = "Error connecting to database.";
    }
}

// New helper function to show the actual player card
function displayPlayer(player) {
    const resultDiv = document.getElementById('result');
    const color = teamColors[player.strTeam] || "#1a1a1a";
    document.body.style.backgroundColor = color;

    resultDiv.innerHTML = `
        <div class="player-card">
            <img src="${player.strThumb || 'https://via.placeholder.com/150'}" style="width:100%">
            <h2>${player.strPlayer}</h2>
            <p class="team-name">${player.strTeam} | #${player.strNumber || 'N/A'}</p>
            <div class="stats-grid">
                <div class="stat-item"><span>Pos</span><b>${player.strPosition}</b></div>
                <div class="stat-item"><span>Height</span><b>${player.strHeight || '--'}</b></div>
                <div class="stat-item"><span>Weight</span><b>${player.strWeight || '--'}</b></div>
                <div class="stat-item"><span>College</span><b>${player.strCollege || 'N/A'}</b></div>
            </div>
        </div>`;
}
