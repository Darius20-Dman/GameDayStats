const teams = [
    { id: 1, name: "Lions FC", city: "Detroit", points: 45 },
    { id: 2, name: "Tigers SC", city: "London", points: 38 },
    { id: 3, name: "Eagles United", city: "Lisbon", points: 41 }
];

const teamList = document.getElementById('teamList');
const searchBar = document.getElementById('searchBar');
const detailsCard = document.getElementById('detailsCard');

// Render Function
function displayTeams(filterText = "") {
    teamList.innerHTML = ""; // Clear list

    const filtered = teams.filter(t => 
        t.name.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(team => {
        const div = document.createElement('div');
        div.className = 'team-item';
        div.innerHTML = `<strong>${team.name}</strong> <br> <small>${team.city}</small>`;
        
        div.onclick = () => showDetails(team);
        teamList.appendChild(div);
    });
}

function showDetails(team) {
    detailsCard.innerHTML = `
        <h2 style="color: #3b82f6">${team.name}</h2>
        <p>Location: ${team.city}</p>
        <p>Current Season Points: <strong>${team.points}</strong></p>
        <hr style="margin: 1rem 0; opacity: 0.1">
        <button onclick="alert('Favorite Added!')">Add to Favorites</button>
    `;
}

// Search Listener
searchBar.addEventListener('input', (e) => {
    displayTeams(e.target.value);
});

// Initial Load
displayTeams();
