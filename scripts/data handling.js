document.addEventListener('DOMContentLoaded', () => {
    let allResources = []; // Store data globally to access in functions

    // 1. Fetch the JSON data
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            allResources = data.resources;
            initializeFilters(data);
            renderResources(allResources); // Show everything initially
        })
        .catch(err => console.error('Error loading resources:', err));

    // 2. Initialize the Semester Filter (The "Parent" Filter)
    function initializeFilters(data) {
        const semesterSelect = document.getElementById('filter-semester');
        
        // Use the 'semesters' list from JSON, or derive it from resources
        data.semesters.forEach(sem => {
            const option = document.createElement('option');
            option.value = sem;
            option.textContent = `Semester ${sem}`;
            semesterSelect.appendChild(option);
        });

        // Add Event Listeners
        document.getElementById('filter-semester').addEventListener('change', handleSemesterChange);
        document.getElementById('filter-subject').addEventListener('change', handleSubjectChange);
        document.getElementById('filter-type').addEventListener('change', handleTypeChange);
        document.getElementById('search-input').addEventListener('input', handleSearch);
    }

    // 3. Handle Semester Change -> Updates Subject List
    function handleSemesterChange() {
        const semesterVal = document.getElementById('filter-semester').value;
        const subjectSelect = document.getElementById('filter-subject');
        const typeSelect = document.getElementById('filter-type');

        // Reset lower-level filters
        subjectSelect.innerHTML = '<option value="all">All Subjects</option>';
        typeSelect.innerHTML = '<option value="all">All Types</option>';
        subjectSelect.disabled = true;
        typeSelect.disabled = true;

        if (semesterVal === 'all') {
            renderResources(allResources);
            return;
        }

        // Enable Subject Select
        subjectSelect.disabled = false;

        // Find all resources belonging to this Semester
        const relevantResources = allResources.filter(r => r.semester == semesterVal);

        // Extract UNIQUE subjects from these resources
        const uniqueSubjects = [...new Set(relevantResources.map(r => r.subject))];

        // Populate Subject Dropdown
        uniqueSubjects.forEach(subj => {
            const option = document.createElement('option');
            option.value = subj;
            option.textContent = subj;
            subjectSelect.appendChild(option);
        });

        filterAndRender();
    }

    // 4. Handle Subject Change -> Updates Type List
    function handleSubjectChange() {
        const subjectVal = document.getElementById('filter-subject').value;
        const semesterVal = document.getElementById('filter-semester').value;
        const typeSelect = document.getElementById('filter-type');

        // Reset Type filter
        typeSelect.innerHTML = '<option value="all">All Types</option>';
        typeSelect.disabled = true;

        if (subjectVal === 'all') {
            filterAndRender();
            return;
        }

        // Enable Type Select
        typeSelect.disabled = false;

        // Find resources matching Semester AND Subject
        const relevantResources = allResources.filter(r => 
            r.semester == semesterVal && r.subject === subjectVal
        );

        // Extract UNIQUE types (filtering out empty strings if any)
        const uniqueTypes = [...new Set(relevantResources.map(r => r.type))].filter(t => t);

        // Populate Type Dropdown
        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeSelect.appendChild(option);
        });

        filterAndRender();
    }

    // 5. Handle Type Change
    function handleTypeChange() {
        filterAndRender();
    }

    // 6. Handle Search
    function handleSearch() {
        filterAndRender();
    }

    // 7. Master Filter Function (Runs on any change)
    function filterAndRender() {
        const semesterVal = document.getElementById('filter-semester').value;
        const subjectVal = document.getElementById('filter-subject').value;
        const typeVal = document.getElementById('filter-type').value;
        const searchVal = document.getElementById('search-input').value.toLowerCase();

        const filtered = allResources.filter(item => {
            // Check Semester (if 'all', ignore check)
            const matchSem = (semesterVal === 'all') || (item.semester == semesterVal);
            
            // Check Subject (if 'all', ignore check)
            const matchSub = (subjectVal === 'all') || (item.subject === subjectVal);
            
            // Check Type (if 'all', ignore check)
            const matchType = (typeVal === 'all') || (item.type === typeVal);

            // Check Search
            const matchSearch = item.title.toLowerCase().includes(searchVal) || 
                                item.subject.toLowerCase().includes(searchVal);

            return matchSem && matchSub && matchType && matchSearch;
        });

        renderResources(filtered);
    }

    // 8. Render Grid
    function renderResources(resources) {
        const grid = document.getElementById('resource-grid');
        grid.innerHTML = ''; 

        if (resources.length === 0) {
            grid.innerHTML = '<div class="no-results">No resources found.</div>';
            return;
        }

        resources.forEach(res => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            // Handle empty type display
            const displayType = res.type ? `<span class="tag">${res.type}</span>` : '';
            
            card.innerHTML = `
                <div class="card-header">
                    <h4>${res.title}</h4>
                    ${displayType}
                </div>
                <div class="card-body">
                    <p><strong>Subject:</strong> ${res.subject}</p>
                    <p><strong>Semester:</strong> ${res.semester}</p>
                </div>
                <a href="${res.drive_link}" target="_blank" class="download-btn">Open Resource</a>
            `;
            grid.appendChild(card);
        });
    }
});
