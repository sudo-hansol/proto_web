document.addEventListener('DOMContentLoaded', () => {
    let allResources = []; 

    // 1. ADD THE NEW FUNCTIONS AT THE BEGINNING
    function updateResultsCounter(count, total) {
        const counter = document.getElementById('results-counter');
        if (counter) {
            counter.innerHTML = `<i class="fas fa-file-alt"></i> Showing ${count} of ${total} resources`;
        }
    }

    function updateHeroStats(data) {
    const resources = data.resources;
    
    // Filter only resources with drive_link
    const resourcesWithLinks = resources.filter(r => r.drive_link && r.drive_link.trim() !== '');
    
    // Count unique subjects (only those with links)
    const uniqueSubjects = [...new Set(resourcesWithLinks.map(r => r.subject))].length;
    const subjectCountEl = document.getElementById('subject-count');
    if (subjectCountEl) subjectCountEl.textContent = `${uniqueSubjects}+`;
    
    // Count total resources (only those with links)
    const resourceCountEl = document.getElementById('resource-count');
    if (resourceCountEl) resourceCountEl.textContent = `${resourcesWithLinks.length}+`;
    
    // Count unique types (only those with links)
    const uniqueTypes = [...new Set(resourcesWithLinks.map(r => r.type))].length;
    const typeCountEl = document.getElementById('type-count');
    if (typeCountEl) typeCountEl.textContent = uniqueTypes;
}

    // 2. UPDATE THE FETCH SECTION
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            allResources = data.resources;
            initializeFilters(data);
            updateHeroStats(data);
            renderResources(allResources); 
            updateResultsCounter(allResources.length, allResources.length);
        })
        .catch(err => console.error('Error loading resources:', err));

    // 3. Initialize Filters & Event Listeners
    function initializeFilters(data) {
        const semesterSelect = document.getElementById('filter-semester');
        
        // Populate Semester Dropdown
        data.semesters.forEach(sem => {
            const option = document.createElement('option');
            option.value = sem;
            option.textContent = `Semester ${sem}`;
            semesterSelect.appendChild(option);
        });

        // Add Event Listeners for Dropdowns
        document.getElementById('filter-semester').addEventListener('change', handleSemesterChange);
        document.getElementById('filter-subject').addEventListener('change', handleSubjectChange);
        document.getElementById('filter-type').addEventListener('change', handleTypeChange);
        document.getElementById('search-input').addEventListener('input', handleSearch);

        // Add Event Listener for Reset Button
        const resetButton = document.getElementById('reset-filters');
        if (resetButton) {
            resetButton.addEventListener('click', resetFilters);
        }
    }

    // 4. Filter Logic (keep your existing functions)
    function handleSemesterChange() {
        const semesterVal = document.getElementById('filter-semester').value;
        const subjectSelect = document.getElementById('filter-subject');
        const typeSelect = document.getElementById('filter-type');

        // Reset lower dropdowns
        subjectSelect.innerHTML = '<option value="all">All Subjects</option>';
        typeSelect.innerHTML = '<option value="all">All Types</option>';
        subjectSelect.disabled = true;
        typeSelect.disabled = true;

        if (semesterVal === 'all') {
            filterAndRender();
            return;
        }

        // Enable Subject
        subjectSelect.disabled = false;

        // Populate Subjects (Unique ones only)
        const relevantResources = allResources.filter(r => r.semester == semesterVal);
        const uniqueSubjects = [...new Set(relevantResources.map(r => r.subject))];

        uniqueSubjects.forEach(subj => {
            if (subj) {
                const option = document.createElement('option');
                option.value = subj;
                option.textContent = subj;
                subjectSelect.appendChild(option);
            }
        });

        filterAndRender();
    }

    function handleSubjectChange() {
        const subjectVal = document.getElementById('filter-subject').value;
        const semesterVal = document.getElementById('filter-semester').value;
        const typeSelect = document.getElementById('filter-type');

        typeSelect.innerHTML = '<option value="all">All Types</option>';
        typeSelect.disabled = true;

        if (subjectVal === 'all') {
            filterAndRender();
            return;
        }

        // Enable Type
        typeSelect.disabled = false;

        // Populate Types (Unique ones only)
        const relevantResources = allResources.filter(r => 
            r.semester == semesterVal && r.subject === subjectVal
        );
        const uniqueTypes = [...new Set(relevantResources.map(r => r.type))].filter(t => t);

        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });

        filterAndRender();
    }

    function handleTypeChange() { filterAndRender(); }
    function handleSearch() { filterAndRender(); }

    // 5. Reset Function
    function resetFilters() {
        document.getElementById('filter-semester').value = 'all';
        
        // Reset cascading dropdowns
        const subjectSelect = document.getElementById('filter-subject');
        const typeSelect = document.getElementById('filter-type');
        
        subjectSelect.innerHTML = '<option value="all">All Subjects</option>';
        subjectSelect.disabled = true;
        
        typeSelect.innerHTML = '<option value="all">All Types</option>';
        typeSelect.disabled = true;

        document.getElementById('search-input').value = '';
        
        renderResources(allResources);
    }

    // 6. Master Filter Function
    // 6. Master Filter Function - UPDATED to hide resources without drive_link
function filterAndRender() {
    const semesterVal = document.getElementById('filter-semester').value;
    const subjectVal = document.getElementById('filter-subject').value;
    const typeVal = document.getElementById('filter-type').value;
    const searchVal = document.getElementById('search-input').value.toLowerCase();

    const filtered = allResources.filter(item => {
        // Skip items without drive_link
        if (!item.drive_link || item.drive_link === '#' || item.drive_link.trim() === '') {
            return false;
        }
        
        const matchSem = (semesterVal === 'all') || (item.semester == semesterVal);
        const matchSub = (subjectVal === 'all') || (item.subject === subjectVal);
        const matchType = (typeVal === 'all') || (item.type === typeVal);
        
        let matchSearch = true;
        if (searchVal) {
            const titleMatch = item.title.toLowerCase().includes(searchVal);
            const subjectMatch = item.subject.toLowerCase().includes(searchVal);
            matchSearch = titleMatch || subjectMatch;
        }

        return matchSem && matchSub && matchType && matchSearch;
    });

    renderResources(filtered);
}

    // 7. UPDATED Render Grid Function
    // 7. UPDATED Render Grid Function - Only shows resources with drive_link
function renderResources(resources) {
    const grid = document.getElementById('resource-grid');
    grid.innerHTML = ''; 

    if (resources.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No Resources Available</h3>
                <p>No resources with download links are currently available for the selected filters.</p>
                <button onclick="resetFilters()" class="filter-btn" style="margin-top: 1.5rem;">
                    <i class="fas fa-redo"></i> Reset All Filters
                </button>
            </div>
        `;
        updateResultsCounter(0, allResources.length);
        return;
    }

    resources.forEach(res => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        // Badge Styling Logic
        let typeBadgeClass = 'badge-default';
        let typeIcon = '📄';
        
        if (res.type === 'Lecture') {
            typeBadgeClass = 'badge-lecture';
            typeIcon = '📚';
        } else if (res.type === 'TD/Series') {
            typeBadgeClass = 'badge-td';
            typeIcon = '✏️';
        } else if (res.type === 'Exam') {
            typeBadgeClass = 'badge-exam';
            typeIcon = '📝';
        } else if (res.type === 'TP') {
            typeBadgeClass = 'badge-tp';
            typeIcon = '💻';
        }

        card.innerHTML = `
            <div class="resource-header">
                <div class="resource-badge semester-${res.semester}">
                    <i class="fas fa-graduation-cap"></i> Sem ${res.semester}
                </div>
                ${res.type ? `
                <div class="resource-badge ${typeBadgeClass}">
                    ${typeIcon} ${res.type}
                </div>` : ''}
            </div>
            
            <h3 class="resource-title">${res.title}</h3>
            
            <div class="resource-meta">
                <span class="resource-meta-item">
                    <i class="fas fa-book"></i> ${res.subject}
                </span>
            </div>
            
            <a href="${res.drive_link}" 
               class="resource-link" 
               target="_blank"
               rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> View Resource
            </a>
        `;
        grid.appendChild(card);
    });
    
    updateResultsCounter(resources.length, allResources.length);
}
});