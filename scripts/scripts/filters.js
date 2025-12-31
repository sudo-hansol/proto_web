
// Filter functionality - This file can be merged with app.js if preferred
// Currently kept separate for modularity

// Note: The actual filter logic is now in dataHandler.js and app.js
// This file can be removed or used for additional filter-related functionality

// Function to update filter UI state
function updateFilterUI() {
    // Add any UI-specific filter updates here
}

// Function to reset all filters
function resetFilters() {
    const semesterFilter = document.getElementById('filter-semester');
    const subjectFilter = document.getElementById('filter-subject');
    const typeFilter = document.getElementById('filter-type');
    const searchInput = document.getElementById('search-input');
    
    if (semesterFilter) semesterFilter.value = 'all';
    if (subjectFilter) subjectFilter.value = 'all';
    if (typeFilter) typeFilter.value = 'all';
    if (searchInput) searchInput.value = '';
    
    // Trigger re-render
    if (typeof renderResourceCards === 'function') {
        renderResourceCards();
    }
}

// Add reset button if needed (optional)
function addResetButton() {
    const filterSection = document.getElementById('filters');
    if (!filterSection) return;
    
    const resetButton = document.createElement('button');
    resetButton.id = 'reset-filters';
    resetButton.className = 'filter-reset';
    resetButton.textContent = 'Reset Filters';
    resetButton.addEventListener('click', resetFilters);
    
    // Add to filter section
    const filterGroup = filterSection.querySelector('.filter-group');
    if (filterGroup) {
        filterGroup.appendChild(resetButton);
    }
}

// Initialize filter-related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add reset button (optional)
    // addResetButton();
});


