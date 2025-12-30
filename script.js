// Add your modules and links here
const database = [
    { name: "Algebra 1", sem: "s1", type: "course", link: "#" },
    { name: "Analysis 1", sem: "s1", type: "course", link: "#" },
    { name: "Algorithms TD", sem: "s1", type: "td", link: "#" },
    { name: "Intro to AI", sem: "s2", type: "course", link: "#" },
    { name: "Probability Exam", sem: "s2", type: "exam", link: "#" }
];

function renderCards(data) {
    const grid = document.getElementById('resource-grid');
    grid.innerHTML = "";

    if(data.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No resources found.</p>";
        return;
    }

    data.forEach(item => {
        grid.innerHTML += `
            <div class="card">
                <span class="badge">${item.type.toUpperCase()}</span>
                <h3>${item.name}</h3>
                <p>Semester: ${item.sem.toUpperCase()}</p>
                <a href="${item.link}" class="btn">Download / View</a>
            </div>
        `;
    });
}

function runFilter() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const sem = document.getElementById('sem-filter').value;
    const type = document.getElementById('type-filter').value;

    const filtered = database.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search);
        const matchSem = sem === "all" || item.sem === sem;
        const matchType = type === "all" || item.type === type;
        return matchSearch && matchSem && matchType;
    });

    renderCards(filtered);
}

// Start page with all items
renderCards(database);