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

            const tdFechaRegistro = document.createElement('td');

            // Parsear y formatear la fecha
            const date = new Date(aula.fecha_registro);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            tdFechaRegistro.textContent = formattedDate;

            tr.appendChild(tdFechaRegistro);

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

        const applyFiltersButton = document.getElementById('apply-filters');
        applyFiltersButton.addEventListener('click', function() {
            const minCapacity = parseInt(document.getElementById('filter-capacity-min').value) || 0;
            const maxCapacity = parseInt(document.getElementById('filter-capacity-max').value) || Infinity;
            const statusFilter = document.getElementById('filter-status').value;
            const filterDate = document.getElementById('filter-date').value;
    
            let filteredAulas = aulasData;
    
            // Filtrar por capacidad
            filteredAulas = filteredAulas.filter(aula => aula.capacidad >= minCapacity && aula.capacidad <= maxCapacity);
    
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
    
            // Filtrar por fecha si se proporciona una
            if (filterDate) {
                filteredAulas = filteredAulas.filter(aula => {
                    const aulaDate = new Date(aula.fecha_registro).toISOString().split('T')[0];  // Convierte la fecha a formato YYYY-MM-DD
                    return aulaDate === filterDate;
                });
            }
    
            renderAulas(filteredAulas);
        });
    
});

