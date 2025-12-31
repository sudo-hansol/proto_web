// filters.js - Additional filter functionality

// Semester-based subject filtering
document.addEventListener('DOMContentLoaded', () => {
    const semesterSelect = document.getElementById('filter-semester');
    const subjectSelect = document.getElementById('filter-subject');
    
    if (semesterSelect && subjectSelect) {
        semesterSelect.addEventListener('change', () => {
            const selectedSemester = semesterSelect.value;
            
            if (selectedSemester === 'all') {
                // Show all subjects
                Array.from(subjectSelect.options).forEach(option => {
                    option.style.display = '';
                });
            } else {
                // Filter subjects by semester
                const semesterSubjects = getSubjectsBySemester(parseInt(selectedSemester));
                Array.from(subjectSelect.options).forEach(option => {
                    if (option.value === 'all' || semesterSubjects.includes(option.value)) {
                        option.style.display = '';
                    } else {
                        option.style.display = 'none';
                    }
                });
                
                // Reset subject selection if current selection is not in the filtered list
                if (subjectSelect.value !== 'all' && !semesterSubjects.includes(subjectSelect.value)) {
                    subjectSelect.value = 'all';
                }
            }
        });
    }
});

function getSubjectsBySemester(semester) {
    // Map of subjects by semester based on the curriculum
    const semesterSubjects = {
        1: [
            "Analysis I",
            "Algebra I", 
            "Algorithms and Data Structures 1",
            "Discrete Mathematics",
            "Free/Open Source Software",
            "Introduction to Data Visualization",
            "Academic English for AI & Data Science"
        ],
        2: [
            "Analysis II",
            "Algebra II",
            "Algorithms and Data Structures 2",
            "Probability and Descriptive Statistics",
            "Introduction to Artificial Intelligence",
            "Mathematical Physics Equations",
            "Fundamentals of Programming and Scientific Computing with Python"
        ],
        3: [
            "Analysis III",
            "Algebra III",
            "Introduction to Topology",
            "Numerical Analysis",
            "Mathematics for Machine Learning 1",
            "Graph Theory",
            "Data Analysis"
        ],
        4: [
            "Measure and Integration",
            "Normed Vector Spaces",
            "Differential Equations",
            "Mathematics for Machine Learning 2",
            "Geometry",
            "Introduction to Machine Learning",
            "Entrepreneurship and Creativity Workshops"
        ],
        5: [
            "Introduction to Functional Analysis",
            "Differential Geometry",
            "Inferential Statistics",
            "Complex Analysis",
            "Partial Differential Equations",
            "Big Data and Cloud Computing",
            "Scientific Methodology and Writing"
        ],
        6: [
            "Advanced Probability",
            "Introduction to Stochastic Processes",
            "Deep Learning & Physics-Informed Neural Networks",
            "Natural Language Processing (NLP)",
            "Computer Vision",
            "Time Series",
            "Ethics and History of Modern Mathematics"
        ]
    };
    
    return semesterSubjects[semester] || [];
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('search-input');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            applyFilters();
        }
    }
});

// Export function for use in other files
if (typeof window !== 'undefined') {
    window.applyFilters = applyFilters;
    window.resetFilters = resetFilters;
}
