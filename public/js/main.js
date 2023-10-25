document.addEventListener('DOMContentLoaded', function() {

    let aulasData = [];

    function renderAulas(aulas) {
        const container = document.getElementById('aulas-list');
        container.innerHTML = '';  // Limpiar el contenedor de tarjetas
    
        aulas.forEach(aula => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-aula-id', aula.id);
    
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
    
            // Switch
            const switchLabel = document.createElement('label');
            switchLabel.className = 'switch';

            switchLabel.addEventListener('click', function(event) {
                event.stopPropagation();  // Detener la propagación al hacer clic en el label
            });

            const switchInput = document.createElement('input');
            switchInput.type = 'checkbox';
            switchInput.checked = aula.habilitado;  // Si el aula está habilitada, marca el switch
            switchInput.addEventListener('change', function(event) {
                toggleHabilitar(switchInput);  // Solo maneja el cambio de estado aquí
            });

            const switchSlider = document.createElement('span');
            switchSlider.className = 'slider';

            switchLabel.appendChild(switchInput);
            switchLabel.appendChild(switchSlider);

            rightDiv.appendChild(switchLabel);

            // const btnSwitch = document.createElement('button');
            // btnSwitch.textContent = 'Switch';
            // btnSwitch.addEventListener('click', function(event) {
            //     event.stopPropagation();  // Evitar que el evento se propague al padre (la tarjeta)
            //     // Lógica para el botón Switch
            // });
            // rightDiv.appendChild(btnSwitch);
    
            const btnEdit = document.createElement('button');
            btnEdit.textContent = 'Editar';
            btnEdit.addEventListener('click', function(event) {
                event.stopPropagation();  // Evitar que el evento se propague al padre (la tarjeta)
                window.location.href = `/editar_aula/${aula.id}`; 
            });
            rightDiv.appendChild(btnEdit);
    
            card.appendChild(rightDiv);
    
            container.appendChild(card);
            card.addEventListener('click', function() {
                const modal = document.getElementById("aulaModal");
    
                // Rellenar información en el modal
                document.getElementById("modal-nombre").textContent = aula.nombre;
                document.getElementById("modal-tipo").textContent = "Tipo: " + aula.tipo;
                document.getElementById("modal-descripcion").textContent = "Descripción: " + aula.descripcion;
                document.getElementById("modal-facilidades").textContent = "Facilidades: " + aula.facilidades;
                document.getElementById("modal-estado").textContent = aula.habilitado ? "Estado: habilitado" : "Estado: Inhabilitado";
                document.getElementById("modal-activo").textContent = aula.activo ? "Sí" : "No";

                // Mostrar el modal
                modal.style.display = "block";
    
                // Cerrar el modal al hacer clic en la "X" o fuera del modal
                const closeModal = document.querySelector(".close-modal");
                closeModal.onclick = function() {
                    modal.style.display = "none";
                }
    
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            });
        });
        
    }
    function toggleHabilitar(checkboxElement) {
        const aulaId = checkboxElement.closest('.card').getAttribute('data-aula-id');
        const isHabilitado = checkboxElement.checked;
    
        fetch(`/api/aula/${aulaId}/toggleHabilitar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ habilitado: isHabilitado })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Aula ${isHabilitado ? 'habilitada' : 'inhabilitada'} con éxito.`);
            } else {
                // Si hay un error, revertir el cambio en el switch
                checkboxElement.checked = !isHabilitado;
                alert('Error al cambiar el estado de la aula.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
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
