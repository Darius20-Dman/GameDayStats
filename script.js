// 1. Team Color Database
const teamColors = {
    "Kansas City Chiefs": "#e31837",
    "Dallas Cowboys": "#003594",
    "Green Bay Packers": "#203731",
    "San Francisco 49ers": "#aa0000",
    "Miami Dolphins": "#008e97",
    "Philadelphia Eagles": "#004c54",
    "Pittsburgh Steelers": "#FFB612",
    "Las Vegas Raiders": "#A5ACAF"
    // You can add more teams and hex codes here!
};

// 2. Search Player and Change Colors
async function searchPlayer() {
    const name = document.getElementById('playerInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Scouting...";

    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
        const data = await response.json();

        if (data.player) {
            const player = data.player[0];
            
            // Apply Team Color
            const color = teamColors[player.strTeam] || "#1a1a1a";
            document.body.style.backgroundColor = color;

            resultDiv.innerHTML = `
                <div class="player-card">
                    <img src="${player.strThumb || 'https://via.placeholder.com/150'}" style="width:100%">
                    <h2>${player.strPlayer}</h2>
                    <p><strong>${player.strTeam}</strong></p>
                    <div class="stats-grid">
                        <div class="stat-item"><span>Pos</span><b>${player.strPosition}</b></div>
                        <div class="stat-item"><span>Height</span><b>${player.strHeight || '--'}</b></div>
                    </div>
                </div>`;
        }
    } catch (e) { resultDiv.innerHTML = "Error."; }
}

// 3. Fetch News (Using a mock fetch for the news section)
async function loadNews() {
    const newsList = document.getElementById('news-list');
    try {
        // We use the sports database's general events as news for this example
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4391`);
        const data = await response.json();
        
        newsList.innerHTML = data.events.slice(0, 5).map(event => `
            <div class="news-item">
                <h4>${event.strEvent}</h4>
                <p>Date: ${event.dateEvent}</p>
            </div>
        `).join('');
    } catch (e) {
        newsList.innerHTML = "Could not load news at this time.";
    }
}

// Load news immediately when page opens
loadNews();
