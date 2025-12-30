// Expanded database with all modules from the curriculum
const database = [
    // ================= SEMESTER 1 =================
    {
        name: "Analysis I",
        sem: "s1",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH101",
        size: "4.2 MB",
        uploaded: "2023-09-15"
    },
    {
        name: "Algebra I",
        sem: "s1",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH102",
        size: "3.8 MB",
        uploaded: "2023-09-20"
    },
    {
        name: "Algorithms and Data Structures 1",
        sem: "s1",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "CS101",
        size: "5.1 MB",
        uploaded: "2023-09-25"
    },
    {
        name: "Discrete Mathematics",
        sem: "s1",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "MATH103",
        size: "3.5 MB",
        uploaded: "2023-10-01"
    },
    {
        name: "Free/Open Source Software",
        sem: "s1",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "CS102",
        size: "2.2 MB",
        uploaded: "2023-10-05"
    },
    {
        name: "Introduction to Data Visualization",
        sem: "s1",
        type: "course",
        modtype: "discovery",
        link: "#",
        code: "DS101",
        size: "2.8 MB",
        uploaded: "2023-10-10"
    },
    {
        name: "Academic English for AI & Data Science",
        sem: "s1",
        type: "course",
        modtype: "transversal",
        link: "#",
        code: "LANG101",
        size: "1.5 MB",
        uploaded: "2023-10-12"
    },

    // ================= SEMESTER 2 =================
    {
        name: "Analysis II",
        sem: "s2",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH201",
        size: "4.5 MB",
        uploaded: "2024-02-18"
    },
    {
        name: "Algebra II",
        sem: "s2",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH202",
        size: "3.2 MB",
        uploaded: "2024-02-22"
    },
    {
        name: "Algorithms and Data Structures 2",
        sem: "s2",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "CS201",
        size: "4.8 MB",
        uploaded: "2024-02-25"
    },
    {
        name: "Probability and Descriptive Statistics",
        sem: "s2",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH204",
        size: "4.1 MB",
        uploaded: "2024-03-01"
    },
    {
        name: "Introduction to Artificial Intelligence",
        sem: "s2",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "AI201",
        size: "5.5 MB",
        uploaded: "2024-03-05"
    },
    {
        name: "Mathematical Physics Equations",
        sem: "s2",
        type: "course",
        modtype: "discovery",
        link: "#",
        code: "PHYS201",
        size: "3.9 MB",
        uploaded: "2024-03-10"
    },
    {
        name: "Fundamentals of Programming with Python",
        sem: "s2",
        type: "course",
        modtype: "transversal",
        link: "#",
        code: "CS202",
        size: "6.2 MB",
        uploaded: "2024-03-15"
    },

    // ================= SEMESTER 3 =================
    {
        name: "Analysis III",
        sem: "s3",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH301",
        size: "5.2 MB",
        uploaded: "2024-09-20"
    },
    {
        name: "Algebra III",
        sem: "s3",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH302",
        size: "4.0 MB",
        uploaded: "2024-09-22"
    },
    {
        name: "Introduction to Topology",
        sem: "s3",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH303",
        size: "4.8 MB",
        uploaded: "2024-10-05"
    },
    {
        name: "Numerical Analysis",
        sem: "s3",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "MATH304",
        size: "5.5 MB",
        uploaded: "2024-10-10"
    },
    {
        name: "Mathematics for Machine Learning 1",
        sem: "s3",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "AI301",
        size: "4.2 MB",
        uploaded: "2024-10-15"
    },
    {
        name: "Graph Theory",
        sem: "s3",
        type: "course",
        modtype: "discovery",
        link: "#",
        code: "MATH305",
        size: "3.1 MB",
        uploaded: "2024-10-20"
    },
    {
        name: "Data Analysis",
        sem: "s3",
        type: "course",
        modtype: "transversal",
        link: "#",
        code: "DS301",
        size: "2.9 MB",
        uploaded: "2024-10-25"
    },

    // ================= SEMESTER 4 =================
    {
        name: "Measure and Integration",
        sem: "s4",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH401",
        size: "5.5 MB",
        uploaded: "2025-02-18"
    },
    {
        name: "Normed Vector Spaces",
        sem: "s4",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH402",
        size: "4.6 MB",
        uploaded: "2025-02-20"
    },
    {
        name: "Differential Equations",
        sem: "s4",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH403",
        size: "4.9 MB",
        uploaded: "2025-02-25"
    },
    {
        name: "Mathematics for Machine Learning 2",
        sem: "s4",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "AI402",
        size: "5.1 MB",
        uploaded: "2025-03-01"
    },
    {
        name: "Geometry",
        sem: "s4",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "MATH404",
        size: "3.8 MB",
        uploaded: "2025-03-05"
    },
    {
        name: "Introduction to Machine Learning",
        sem: "s4",
        type: "course",
        modtype: "discovery",
        link: "#",
        code: "AI401",
        size: "6.0 MB",
        uploaded: "2025-03-10"
    },
    {
        name: "Entrepreneurship and Creativity",
        sem: "s4",
        type: "course",
        modtype: "transversal",
        link: "#",
        code: "BUS401",
        size: "1.2 MB",
        uploaded: "2025-03-15"
    },

    // ================= SEMESTER 5 =================
    {
        name: "Introduction to Functional Analysis",
        sem: "s5",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH501",
        size: "6.2 MB",
        uploaded: "2025-09-20"
    },
    {
        name: "Differential Geometry",
        sem: "s5",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH502",
        size: "5.9 MB",
        uploaded: "2025-09-22"
    },
    {
        name: "Inferential Statistics",
        sem: "s5",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH503",
        size: "5.8 MB",
        uploaded: "2025-09-25"
    },
    {
        name: "Complex Analysis",
        sem: "s5",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "MATH504",
        size: "4.5 MB",
        uploaded: "2025-10-01"
    },
    {
        name: "Partial Differential Equations",
        sem: "s5",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "MATH505",
        size: "5.3 MB",
        uploaded: "2025-10-05"
    },
    {
        name: "Big Data and Cloud Computing",
        sem: "s5",
        type: "course",
        modtype: "discovery",
        link: "#",
        code: "CS501",
        size: "7.1 MB",
        uploaded: "2025-10-10"
    },
    {
        name: "Scientific Methodology and Writing",
        sem: "s5",
        type: "course",
        modtype: "transversal",
        link: "#",
        code: "RES501",
        size: "1.8 MB",
        uploaded: "2025-10-15"
    },

    // ================= SEMESTER 6 =================
    {
        name: "Advanced Probability",
        sem: "s6",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH601",
        size: "6.5 MB",
        uploaded: "2026-02-18"
    },
    {
        name: "Introduction to Stochastic Processes",
        sem: "s6",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "MATH602",
        size: "6.8 MB",
        uploaded: "2026-02-20"
    },
    {
        name: "Deep Learning & PINNs",
        sem: "s6",
        type: "course",
        modtype: "fundamental",
        link: "#",
        code: "DL601",
        size: "7.2 MB",
        uploaded: "2026-02-22"
    },
    {
        name: "Natural Language Processing (NLP)",
        sem: "s6",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "AI602",
        size: "6.5 MB",
        uploaded: "2026-03-01"
    },
    {
        name: "Computer Vision",
        sem: "s6",
        type: "course",
        modtype: "methodological",
        link: "#",
        code: "AI603",
        size: "8.0 MB",
        uploaded: "2026-03-10"
    },
    {
        name: "Time Series",
        sem: "s6",
        type: "course",
        modtype: "discovery",
        link: "#",
        code: "STAT601",
        size: "4.5 MB",
        uploaded: "2026-03-15"
    },
    {
        name: "Ethics and History of Modern Mathematics",
        sem: "s6",
        type: "course",
        modtype: "transversal",
        link: "#",
        code: "ETH601",
        size: "2.1 MB",
        uploaded: "2026-03-20"
    }
];

/* =========================================
   ✅ PASTE THIS BELOW YOUR "const database"
   ========================================= */



// Current filters state
let currentFilters = { sem: 'all', type: 'all', modtype: 'all' };
let currentView = 'grid';

// 1. Render Cards Function (Fixed)
function renderCards(data) {
    const container = document.getElementById('resource-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (data.length === 0) {
        if (noResults) noResults.style.display = 'block';
        container.innerHTML = '';
    } else {
        if (noResults) noResults.style.display = 'none';
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = currentView === 'grid' ? 'resource-card' : 'resource-card list-view';
            
            // Format uploaded date
            const uploadedDate = new Date(item.uploaded);
            const formattedDate = uploadedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Type icon mapping
            const typeIcons = {
                'course': 'fas fa-book',
                'td': 'fas fa-file-alt',
                'exam': 'fas fa-file-pdf'
            };
            
            // Module type colors mapping
            const modtypeColors = {
                'fundamental': 'primary',
                'methodological': 'purple',
                'discovery': 'orange',
                'transversal': 'green'
            };
            
            card.innerHTML = `
                <div class="card-header">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <span class="badge ${item.sem}">${item.sem.toUpperCase()}</span>
                            <span class="resource-type ${item.type}">${item.type.toUpperCase()}</span>
                        </div>
                        <span class="module-type ${item.modtype}">${item.modtype}</span>
                    </div>
                    <h3>${item.name}</h3>
                    <p class="semester"><i class="fas fa-hashtag"></i> ${item.code}</p>
                </div>
                <div class="card-body">
                    <div class="meta-info">
                        <div class="meta-item">
                            <i class="fas fa-database"></i>
                            <span>${item.size}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    <p>Module type: <strong>${item.modtype}</strong></p>
                </div>
                <div class="card-footer">
                    <a href="${item.link}" class="download-btn" target="_blank">
                        <i class="${typeIcons[item.type] || 'fas fa-download'}"></i>
                        ${item.type === 'exam' ? 'View Exam' : 'Download'}
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    // Update stats
    updateStats(data);
}

// 2. Filter Logic
function setFilter(type, value) {
    // Update active class for buttons
    const buttons = document.querySelectorAll(`button[onclick*="${type}"]`);
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');
    
    // Update filter state
    currentFilters[type] = value;
    runFilter();
}

function runFilter() {
    const searchInput = document.getElementById('search-input');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = database.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search) || 
                          item.code.toLowerCase().includes(search);
        const matchSem = currentFilters.sem === "all" || item.sem === currentFilters.sem;
        const matchType = currentFilters.type === "all" || item.type === currentFilters.type;
        const matchModType = currentFilters.modtype === "all" || item.modtype === currentFilters.modtype;
        
        return matchSearch && matchSem && matchType && matchModType;
    });
    
    renderCards(filtered);
}

// 3. Stats Logic
function updateStats(data) {
    const totalEl = document.getElementById('total-resources');
    const courseEl = document.getElementById('course-count');
    const tdEl = document.getElementById('td-count');
    const examEl = document.getElementById('exam-count');
    
    if(totalEl) totalEl.textContent = data.length;
    
    if(courseEl) {
        const courseCount = data.filter(item => item.type === 'course').length;
        courseEl.textContent = courseCount;
    }
    
    if(tdEl) {
        const tdCount = data.filter(item => item.type === 'td').length;
        tdEl.textContent = tdCount;
    }
    
    if(examEl) {
        const examCount = data.filter(item => item.type === 'exam').length;
        examEl.textContent = examCount;
    }
}

// 4. View Toggle
function setView(view) {
    currentView = view;
    const container = document.getElementById('resource-container');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Update active button
    viewBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update container class
    if (container) {
        container.className = view === 'grid' ? 'resource-grid' : 'resource-list';
    }
    
    // Re-render cards with new view
    const searchInput = document.getElementById('search-input');
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = database.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search) || 
                          item.code.toLowerCase().includes(search);
        const matchSem = currentFilters.sem === "all" || item.sem === currentFilters.sem;
        const matchType = currentFilters.type === "all" || item.type === currentFilters.type;
        const matchModType = currentFilters.modtype === "all" || item.modtype === currentFilters.modtype;
        
        return matchSearch && matchSem && matchType && matchModType;
    });
    
    renderCards(filtered);
}

// 5. Semester Tab Logic
function openSemester(semesterId) {
    // Hide all semester contents
    const contents = document.querySelectorAll(".semester-content");
    contents.forEach(content => {
        content.classList.remove("active");
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll(".semester-tab");
    tabs.forEach(tab => {
        tab.classList.remove("active");
    });
    
    // Show selected semester content
    const selected = document.getElementById(semesterId);
    if(selected) {
        selected.classList.add("active");
    }
    
    // Add active class to clicked button
    event.currentTarget.classList.add("active");
}

// 6. Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', runFilter);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('#hamburger')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Initial render
    runFilter();
    
    // Initialize Lucide icons if available
    if (window.lucide) {
        lucide.createIcons();
    }
});