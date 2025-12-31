let resourcesData;

async function loadResources() {
    try {
        const res = await fetch('data/resources.json');
        resourcesData = await res.json();
        populateFilterOptions(resourcesData);
        renderResources(resourcesData.resources);
    } catch(e) {
        console.error(e);
        document.getElementById("resources-list").innerHTML = "<p>Failed to load resources.</p>";
    }
}

function renderResources(list) {
    const container = document.getElementById("resources-list");
    container.innerHTML = "";
    list.forEach(r=>{
        const card = document.createElement("div");
        card.className = "resource-card";
        card.innerHTML = `
            <h3>${r.title}</h3>
            <p>Semester: ${r.semester} | Subject: ${r.subject} | Type: ${r.type}</p>
            <a href="${r.drive_link}" target="_blank">Open Resource</a>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadResources);
