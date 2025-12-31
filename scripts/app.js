let resourcesData;

async function loadResources() {
    try {
        const res = await fetch('data/resources.json');
        resourcesData = await res.json();
        populateFilterOptions(resourcesData);
        renderResources(resourcesData.resources);
        
        // Add event listeners for filters
        setupEventListeners();
        
        // Show initial stats
        updateResourceStats();
        
    } catch(e) {
        console.error("Error loading resources:", e);
        document.getElementById("resources-container").innerHTML = `
            <div class="card text-center">
                <h3>⚠️ Failed to Load Resources</h3>
                <p>Please check your internet connection and try again.</p>
                <button onclick="loadResources()" class="btn btn-primary mt-2">Retry</button>
            </div>
        `;
    }
}

function setupEventListeners() {
    // Filter change events
    document.getElementById("filter-semester")?.addEventListener("change", applyFilters);
    document.getElementById("filter-subject")?.addEventListener("change", applyFilters);
    document.getElementById("filter-type")?.addEventListener("change", applyFilters);
    
    // Search input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') applyFilters();
        });
    }
    
    // Search button
    const searchBtn = document.getElementById("search-btn");
    if (searchBtn) {
        searchBtn.addEventListener("click", applyFilters);
    }
}

function populateFilterOptions(data) {
    const subjectSelect = document.getElementById("filter-subject");
    const semesterSelect = document.getElementById("filter-semester");
    const typeSelect = document.getElementById("filter-type");
    
    if (!subjectSelect || !semesterSelect || !typeSelect) return;
    
    // Clear existing options except "All"
    while (subjectSelect.options.length > 1) subjectSelect.remove(1);
    while (semesterSelect.options.length > 1) semesterSelect.remove(1);
    while (typeSelect.options.length > 1) typeSelect.remove(1);
    
    // Get unique subjects from resources
    const subjects = [...new Set(data.resources.map(r => r.subject))].sort();
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
    
    // Get unique semesters from resources
    const semesters = [...new Set(data.resources.map(r => r.semester))].sort((a, b) => a - b);
    semesters.forEach(semester => {
        const option = document.createElement("option");
        option.value = semester;
        option.textContent = `Semester ${semester}`;
        semesterSelect.appendChild(option);
    });
    
    // Get unique types from resources (with fallback)
    const types = [...new Set(data.resources.map(r => r.type || '').filter(t => t))];
    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
    
    // If no types in data, add default types
    if (types.length === 0) {
        const defaultTypes = ["Lecture", "TD/Series", "Exam", "TP", "Project"];
        defaultTypes.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });
    }
}

function applyFilters() {
    if (!resourcesData) return;
    
    const semesterFilter = document.getElementById("filter-semester")?.value;
    const subjectFilter = document.getElementById("filter-subject")?.value;
    const typeFilter = document.getElementById("filter-type")?.value;
    const searchTerm = document.getElementById("search-input")?.value.toLowerCase() || '';
    
    let filtered = resourcesData.resources;
    
    // Apply semester filter
    if (semesterFilter && semesterFilter !== "all") {
        filtered = filtered.filter(r => r.semester == semesterFilter);
    }
    
    // Apply subject filter
    if (subjectFilter && subjectFilter !== "all") {
        filtered = filtered.filter(r => r.subject === subjectFilter);
    }
    
    // Apply type filter
    if (typeFilter && typeFilter !== "all") {
        filtered = filtered.filter(r => r.type === typeFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(r => 
            r.title.toLowerCase().includes(searchTerm) ||
            r.subject.toLowerCase().includes(searchTerm) ||
            (r.type && r.type.toLowerCase().includes(searchTerm)) ||
            r.id.toLowerCase().includes(searchTerm)
        );
    }
    
    // Update stats
    updateResourceStats(filtered.length);
    
    // Render filtered results
    renderResources(filtered);
}

function updateResourceStats(filteredCount = null) {
    const statsElement = document.getElementById("resource-stats");
    if (!statsElement) return;
    
    const totalCount = resourcesData.resources.length;
    const showingCount = filteredCount !== null ? filteredCount : totalCount;
    
    statsElement.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Total Resources</div>
            <div>${totalCount}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Showing</div>
            <div>${showingCount}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Subjects</div>
            <div>${[...new Set(resourcesData.resources.map(r => r.subject))].length}</div>
        </div>
    `;
}

function renderResources(list) {
    const container = document.getElementById("resources-container");
    if (!container) return;
    
    if (list.length === 0) {
        container.innerHTML = `
            <div class="card text-center fade-in">
                <h3>🔍 No Resources Found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button onclick="resetFilters()" class="btn btn-secondary mt-2">Reset All Filters</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    list.forEach(resource => {
        const card = document.createElement("div");
        card.className = "resource-card fade-in";
        
        // Determine badge classes based on semester and type
        const semesterClass = `semester-${resource.semester}`;
        const typeBadgeClass = getTypeBadgeClass(resource.type);
        
        card.innerHTML = `
            <div class="resource-header">
                <div class="resource-badge ${semesterClass}">Sem ${resource.semester}</div>
                ${resource.type ? `<div class="resource-badge ${typeBadgeClass}">${resource.type}</div>` : ''}
            </div>
            <h3 class="resource-title">${resource.title}</h3>
            <div class="resource-meta">
                <span class="resource-meta-item">
                    📚 ${resource.subject}
                </span>
                <span class="resource-meta-item">
                    📅 2025-2026
                </span>
                ${resource.credits ? `<span class="resource-meta-item">
                    ⚖️ ${resource.credits} Credits
                </span>` : ''}
            </div>
            <p>${getResourceDescription(resource)}</p>
            ${resource.drive_link ? `
                <a href="${resource.drive_link}" class="resource-link" target="_blank" rel="noopener noreferrer">
                    📥 View Resource
                </a>
            ` : `
                <button class="btn btn-secondary btn-full" disabled>
                    🔒 Resource Link Coming Soon
                </button>
            `}
        `;
        
        container.appendChild(card);
    });
}

function getTypeBadgeClass(type) {
    if (!type) return 'badge-default';
    
    const typeMap = {
        'Lecture': 'badge-lecture',
        'TD/Series': 'badge-td',
        'Exam': 'badge-exam',
        'TP': 'badge-tp',
        'Practical Work': 'badge-tp',
        'Project': 'badge-project',
        'Summary': 'badge-summary',
        'Reference': 'badge-reference'
    };
    
    return typeMap[type] || 'badge-default';
}

function getResourceDescription(resource) {
    // You can customize descriptions based on resource properties
    if (resource.description) {
        return resource.description;
    }
    
    const typeDescriptions = {
        'Lecture': `Lecture notes for ${resource.subject}`,
        'TD/Series': `Exercises and problem sets for ${resource.subject}`,
        'Exam': `Exam papers and solutions for ${resource.subject}`,
        'TP': `Practical work for ${resource.subject}`,
        'Project': `Project assignment for ${resource.subject}`,
        'Summary': `Course summary for ${resource.subject}`
    };
    
    return typeDescriptions[resource.type] || `Study material for ${resource.subject}`;
}

function resetFilters() {
    const semesterSelect = document.getElementById("filter-semester");
    const subjectSelect = document.getElementById("filter-subject");
    const typeSelect = document.getElementById("filter-type");
    const searchInput = document.getElementById("search-input");
    
    if (semesterSelect) semesterSelect.value = "all";
    if (subjectSelect) subjectSelect.value = "all";
    if (typeSelect) typeSelect.value = "all";
    if (searchInput) searchInput.value = "";
    
    applyFilters();
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    // Add stats container if it doesn't exist
    const main = document.querySelector('main');
    if (main && !document.getElementById('resource-stats')) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'detail-grid';
        statsContainer.id = 'resource-stats';
        statsContainer.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Loading Resources...</div>
                <div class="loading"></div>
            </div>
        `;
        
        const resourcesList = document.getElementById('resources-list');
        if (resourcesList) {
            resourcesList.insertBefore(statsContainer, resourcesList.firstChild);
        }
    }
    
    // Load resources
    loadResources();
});
