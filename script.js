async function searchPlayer() {
    const name = document.getElementById('playerInput').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = "Searching...";

    try {
        // This fetches from a free public sports database
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
        const data = await response.json();

        if (data.player) {
            const player = data.player[0];
            resultDiv.innerHTML = `
                <div class="player-card">
                    <img src="${player.strThumb || 'https://via.placeholder.com/150'}" alt="Player Photo">
                    <h2>${player.strPlayer}</h2>
                    <p><strong>Team:</strong> ${player.strTeam}</p>
                    <p><strong>Position:</strong> ${player.strPosition}</p>
                    <p style="font-size: 0.8rem; color: #ccc;">${player.strDescriptionEN ? player.strDescriptionEN.substring(0, 150) + '...' : ''}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = "❌ Player not found. Try a full name like 'Tom Brady'.";
        }
    } catch (error) {
        resultDiv.innerHTML = "Error fetching data. Check your connection.";
    }
}
