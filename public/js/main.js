

document.addEventListener('DOMContentLoaded', function() {
    let aulasData = [];

    function renderAulas(aulas) {
        const tbody = document.getElementById('aulas-list');
        tbody.innerHTML = '';  // Limpiar la tabla

        aulas.forEach(aula => {
            const tr = document.createElement('tr');
            
            const tdNombre = document.createElement('td');
            tdNombre.textContent = aula.nombre;
            tr.appendChild(tdNombre);

            const tdDescripcion = document.createElement('td');
            tdDescripcion.textContent = aula.descripcion;
            tr.appendChild(tdDescripcion);

            const tdCapacidad = document.createElement('td');
            tdCapacidad.textContent = aula.capacidad;
            tr.appendChild(tdCapacidad);

            const tdActivo = document.createElement('td');
            tdActivo.textContent = aula.activo ? "Sí" : "No";
            tr.appendChild(tdActivo);

            tbody.appendChild(tr);
        });
    }

    fetch('/api/aulas')
        .then(response => response.json())
        .then(aulas => {
            aulasData = aulas;
            renderAulas(aulasData);
        })
        .catch(error => {
            console.error("Hubo un error al obtener las aulas:", error);
        });

    const filterButton = document.getElementById('filter-button');
    filterButton.addEventListener('click', function() {
        const capacity = parseInt(document.getElementById('filter-capacity').value);
        const statusFilter = document.getElementById('filter-status').value;

        let filteredAulas = aulasData;

        // Filtrar por capacidad si se proporciona un valor
        if (capacity) {
            filteredAulas = filteredAulas.filter(aula => aula.capacidad > capacity);
        }

        // Filtrar por estado activo
        switch (statusFilter) {
            case 'active':
                filteredAulas = filteredAulas.filter(aula => aula.activo === 1);
                break;
            case 'inactive':
                filteredAulas = filteredAulas.filter(aula => aula.activo === 0);
                break;
            // 'all' no requiere filtrado adicional
        }

        renderAulas(filteredAulas);
    });
});

