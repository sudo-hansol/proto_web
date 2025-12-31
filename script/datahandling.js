document.addEventListener('DOMContentLoaded', () => {
    let allResources = []; 

    // 1. Fetch the JSON data
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            allResources = data.resources;
            initializeFilters(data);
            renderResources(allResources); 
        })
        .catch(err => console.error('Error loading resources:', err));

    // 2. Initialize Filters & Event Listeners
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

        // Add Event Listener for Reset Button (if you add one to HTML)
        const resetButton = document.getElementById('reset-filters');
        if (resetButton) {
            resetButton.addEventListener('click', resetFilters);
        }
    }

    // 3. Filter Logic
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

    // Populate Subjects (Unique ones only) - FIXED
    const relevantResources = allResources.filter(r => r.semester == semesterVal);
    const uniqueSubjects = [...new Set(relevantResources.map(r => r.subject))];

    uniqueSubjects.forEach(subj => {
        if (subj) { // Check if subject is not null/undefined
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

    // 4. Reset Function (From filters.js)
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

    // 5. Master Filter Function
    function filterAndRender() {
    const semesterVal = document.getElementById('filter-semester').value;
    const subjectVal = document.getElementById('filter-subject').value;
    const typeVal = document.getElementById('filter-type').value;
    const searchVal = document.getElementById('search-input').value.toLowerCase();

    const filtered = allResources.filter(item => {
        const matchSem = (semesterVal === 'all') || (item.semester == semesterVal);
        const matchSub = (subjectVal === 'all') || (item.subject === subjectVal);
        const matchType = (typeVal === 'all') || (item.type === typeVal);
        
        // FIXED: Proper search in title AND subject
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
    // 6. Render Grid
    function renderResources(resources) {
        const grid = document.getElementById('resource-grid');
        grid.innerHTML = ''; 

        if (resources.length === 0) {
            grid.innerHTML = '<div class="no-results">No resources found matching your criteria.</div>';
            return;
        }

        resources.forEach(res => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            
            // Badge Styling Logic
            let typeBadgeClass = 'badge-default';
            if (res.type === 'Lecture') typeBadgeClass = 'badge-lecture';
            else if (res.type === 'TD/Series') typeBadgeClass = 'badge-td';
            else if (res.type === 'Exam') typeBadgeClass = 'badge-exam';
            else if (res.type === 'TP') typeBadgeClass = 'badge-tp';

            card.innerHTML = `
                <div class="resource-header">
                    <div class="resource-badge semester-${res.semester}">Sem ${res.semester}</div>
                    ${res.type ? `<div class="resource-badge ${typeBadgeClass}">${res.type}</div>` : ''}
                </div>
                <h3 class="resource-title">${res.title}</h3>
                <div class="resource-meta">
                    <span class="resource-meta-item">
                        📘 ${res.subject}
                    </span>
                </div>
                <a href="${res.drive_link || '#'}" class="resource-link" target="_blank">
                    ${res.drive_link ? '📂 View Resource' : '🔒 Coming Soon'}
                </a>
            `;
            grid.appendChild(card);
        });
    }
});