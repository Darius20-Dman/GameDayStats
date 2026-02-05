async function searchPlayer() {
    const name = document.getElementById('playerInput').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = "<div class='loader'>🔍 Scouting player...</div>";

    try {
        // Step 1: Search for the player to get their ID
        const searchResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
        const searchData = await searchResponse.json();

        if (searchData.player) {
            const player = searchData.player[0];
            
            // Step 2: Display the Stats Card
            resultDiv.innerHTML = `
                <div class="player-card">
                    <img src="${player.strThumb || 'https://via.placeholder.com/150'}" alt="Player Photo">
                    <h2>${player.strPlayer}</h2>
                    <p class="team-name">${player.strTeam} | #${player.strNumber || 'N/A'}</p>
                    
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Position</span>
                            <span class="stat-value">${player.strPosition}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Height</span>
                            <span class="stat-value">${player.strHeight || '---'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Weight</span>
                            <span class="stat-value">${player.strWeight || '---'}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Birthplace</span>
                            <span class="stat-value">${player.strBirthLocation || 'Unknown'}</span>
                        </div>
                    </div>

                    <div class="bio">
                        <h3>Scouting Report</h3>
                        <p>${player.strDescriptionEN ? player.strDescriptionEN.substring(0, 200) + '...' : 'No bio available.'}</p>
                    </div>

                    <a href="https://www.google.com/search?q=${player.strPlayer}+stats" target="_blank" class="stats-btn">View Live Season Stats</a>
                </div>
            `;
        } else {
            resultDiv.innerHTML = "❌ Player not found. Try 'Patrick Mahomes'.";
        }
    } catch (error) {
        resultDiv.innerHTML = "Error connecting to the stadium database.";
    }
}
