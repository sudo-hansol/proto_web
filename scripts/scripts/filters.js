function populateFilterOptions(data){
    const semF = document.getElementById('filter-semester');
    data.semesters.forEach(s=> semF.innerHTML += `<option value="${s}">${s}</option>`);

    const subF = document.getElementById('filter-subject');
    data.subjects.forEach(s=> subF.innerHTML += `<option value="${s}">${s}</option>`);

    const typeF = document.getElementById('filter-type');
    data.types.forEach(t=> typeF.innerHTML += `<option value="${t}">${t}</option>`);

    semF.onchange = applyFilters;
    subF.onchange = applyFilters;
    typeF.onchange = applyFilters;
    document.getElementById('search-input').oninput = applyFilters;
}

function applyFilters(){
    const sem = document.getElementById('filter-semester').value;
    const sub = document.getElementById('filter-subject').value;
    const type = document.getElementById('filter-type').value;
    const search = document.getElementById('search-input').value.toLowerCase();

    const filtered = resourcesData.resources.filter(r=>
        (sem==='all'||String(r.semester)===sem) &&
        (sub==='all'||r.subject===sub) &&
        (type==='all'||r.type===type) &&
        r.title.toLowerCase().includes(search)
    );

    renderResources(filtered);
}
