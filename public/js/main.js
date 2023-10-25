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

    // Llenar el <select> para tipos de ambiente
    fetch('/api/tipos_ambientes')
        .then(response => response.json())
        .then(tipos => {
            const selectTipoAmbiente = document.getElementById('filter-type-ambiente');
            tipos.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.nombre; // Asumiendo que 'id' es un campo en tus datos
                option.textContent = tipo.nombre; // Asumiendo que 'nombre' es un campo en tus datos
                selectTipoAmbiente.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Hubo un error al obtener los tipos de ambiente:", error);
        });

    // Llenar el <select> para facilidades
    fetch('/api/facilidades')
        .then(response => response.json())
        .then(facilidades => {
            const selectFacilidades = document.getElementById('filter-type-facilidad');
            facilidades.forEach(facilidad => {
                const option = document.createElement('option');
                option.value = facilidad.nombre; // Asumiendo que 'id' es un campo en tus datos
                option.textContent = facilidad.nombre; // Asumiendo que 'nombre' es un campo en tus datos
                selectFacilidades.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Hubo un error al obtener las facilidades:", error);
        });

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
            const typeAmbiente = document.getElementById('filter-type-ambiente').value;
            const typeFacilidad = document.getElementById('filter-type-facilidad').value;

            let filteredAulas = aulasData;
    
            filteredAulas = filteredAulas.filter(aula => aula.capacidad >= minCapacity && aula.capacidad <= maxCapacity);
    
            // Filtrar por estado activo
            // Filtrar por estado activo/inactivo
            if (statusFilter === 'active' || statusFilter === 'inactive') {
                filteredAulas = filteredAulas.filter(aula => aula.habilitado === (statusFilter === 'active' ? 1 : 0));
            }
            // Filtrar por tipo de ambiente
            if (typeAmbiente !== 'all') {
                filteredAulas = filteredAulas.filter(aula => aula.tipo === typeAmbiente);
            }
            // Filtrar por tipo de facilidad
            if (typeFacilidad !== 'all') {
                filteredAulas = filteredAulas.filter(aula => aula.facilidades.toLowerCase().includes(typeFacilidad.toLowerCase()));
            }
    
            renderAulas(filteredAulas);
        });
});


document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/tipos_ambientes')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('tipoAmbiente');
        data.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.nombre;
            select.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener los tipos de ambientes:', error);
    });
    // Añadir un listener al formulario para obtener el valor seleccionado
    const form = document.querySelector('form[action="/registrar_aula"]');
    form.addEventListener('submit', function() {
        const selectedValue = document.getElementById('tipoAmbiente').value;
        console.log('Tipo Ambiente seleccionado:', selectedValue);  // Puedes eliminar esta línea después de comprobar que funciona correctamente.
    });
});
