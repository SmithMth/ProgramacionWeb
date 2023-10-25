document.addEventListener('DOMContentLoaded', function() {

    let aulasData = [];

    function renderAulas(aulas) {
        const container = document.getElementById('aulas-list');
        container.innerHTML = '';  // Limpiar el contenedor de tarjetas
    
        aulas.forEach(aula => {
            const card = document.createElement('div');
            card.className = 'card';
    
            // Bloque izquierdo
            const leftDiv = document.createElement('div');
            leftDiv.className = 'left-content';
    
            const h3Nombre = document.createElement('h3');
            h3Nombre.textContent = aula.nombre;
            leftDiv.appendChild(h3Nombre);
    
            const pTipo = document.createElement('p');
            pTipo.textContent = aula.tipo;
            leftDiv.appendChild(pTipo);
    
            card.appendChild(leftDiv);
    
            // Bloque central
            const centerDiv = document.createElement('div');
            centerDiv.className = 'center-content';
    
            const pCapLabel = document.createElement('p');
            pCapLabel.textContent = "Cap.";
            centerDiv.appendChild(pCapLabel);
    
            const pCapacidad = document.createElement('p');
            pCapacidad.textContent = aula.capacidad;
            centerDiv.appendChild(pCapacidad);
    
            card.appendChild(centerDiv);
    
            // Bloque derecho
            const rightDiv = document.createElement('div');
            rightDiv.className = 'right-content';
    
            const btnSwitch = document.createElement('button');
            btnSwitch.textContent = 'Switch';
            rightDiv.appendChild(btnSwitch);
    
            const btnEdit = document.createElement('button');
            btnEdit.textContent = 'Editar';
            rightDiv.appendChild(btnEdit);
    
            card.appendChild(rightDiv);
    
            container.appendChild(card);
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

