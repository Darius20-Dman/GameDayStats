async function searchPlayer() {
    const name = document.getElementById('playerInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "🔍 Scouting NFL players...";

    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
        const data = await response.json();

        // Check if we found players
        if (data.player) {
            // FILTER: We only want players where the sport is "American Football"
            const nflPlayers = data.player.filter(p => p.strSport === "American Football");

            if (nflPlayers.length > 0) {
                const player = nflPlayers[0]; // Take the best match
                
                // Apply Team Color
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
            } else {
                resultDiv.innerHTML = "❌ No American Football player found with that name.";
                document.body.style.backgroundColor = "#1a1a1a"; // Reset color
            }
        } else {
            resultDiv.innerHTML = "❌ Player not found.";
        }
    } catch (e) { 
        resultDiv.innerHTML = "Error connecting to the database."; 
    }
}
