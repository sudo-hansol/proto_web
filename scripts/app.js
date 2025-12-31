
// Main application logic
document.addEventListener('DOMContentLoaded', async function() {
    // Load resource data
    const data = await loadResourceData();
    
    if (!data) {
        document.getElementById('resource-grid').innerHTML = 
            '<div class="error-message">Failed to load resources. Please try again later.</div>';
        return;
    }
    
    // Populate subject filter
    populateSubjectFilter();
    
    // Initial render of all resources
    renderResourceCards();
    
    // Set up filter event listeners
    setupFilterListeners();
});

// Render resource cards based on current filters
function renderResourceCards() {
    const resourceGrid = document.getElementById('resource-grid');
    if (!resourceGrid) return;
    
    // Get current filter values
    const semesterFilter = document.getElementById('filter-semester')?.value || 'all';
    const subjectFilter = document.getElementById('filter-subject')?.value || 'all';
    const typeFilter = document.getElementById('filter-type')?.value || 'all';
    const searchFilter = document.getElementById('search-input')?.value || '';
    
    // Get filtered resources
    const filteredResources = getFilteredResources({
        semester: semesterFilter,
        subject: subjectFilter,
        search: searchFilter
    });
    
    // Generate cards for the filtered resources
    const cards = generateResourceCards(filteredResources, typeFilter === 'all' ? '' : typeFilter);
    
    // Clear current content
    resourceGrid.innerHTML = '';
    
    if (cards.length === 0) {
        resourceGrid.innerHTML = '<div class="no-results">No resources found matching your criteria.</div>';
        return;
    }
    
    // Create and append card elements
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        resourceGrid.appendChild(cardElement);
    });
}

// Create HTML element for a resource card
function createCardElement(card) {
    const div = document.createElement('div');
    div.className = 'resource-card fade-in';
    div.dataset.semester = card.semester;
    div.dataset.subject = card.subject;
    div.dataset.type = card.type;
    
    // Determine badge class based on semester
    const semesterBadgeClass = `semester-${card.semester}`;
    
    // Determine type badge class
    let typeBadgeClass = '';
    if (card.type === 'Lecture') typeBadgeClass = 'badge-lecture';
    else if (card.type === 'TD/Series') typeBadgeClass = 'badge-td';
    else if (card.type === 'Exam') typeBadgeClass = 'badge-exam';
    else if (card.type === 'TP') typeBadgeClass = 'badge-tp';
    else if (card.type === 'Project') typeBadgeClass = 'badge-project';
    
    div.innerHTML = `
        <div class="resource-header">
            <div class="resource-badge ${semesterBadgeClass}">Sem ${card.semester}</div>
            <div class="resource-badge ${typeBadgeClass}">${card.type}</div>
        </div>
        <h3 class="resource-title">${card.title}</h3>
        <div class="resource-meta">
            <span class="resource-meta-item">
                📚 ${card.subject}
            </span>
            <span class="resource-meta-item">
                📅 2025-2026
            </span>
        </div>
        <p>${card.description}</p>
        <a href="${card.drive_link || '#'}" class="resource-link" ${card.drive_link ? 'target="_blank"' : ''}>
            ${card.drive_link ? '📥 View Resource' : '📄 Coming Soon'}
        </a>
    `;
    
    return div;
}

// Set up event listeners for filters
function setupFilterListeners() {
    const semesterFilter = document.getElementById('filter-semester');
    const subjectFilter = document.getElementById('filter-subject');
    const typeFilter = document.getElementById('filter-type');
    const searchInput = document.getElementById('search-input');
    
    if (semesterFilter) {
        semesterFilter.addEventListener('change', renderResourceCards);
    }
    
    if (subjectFilter) {
        subjectFilter.addEventListener('change', renderResourceCards);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', renderResourceCards);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(renderResourceCards, 300));
    }
}

// Utility function for debouncing search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

