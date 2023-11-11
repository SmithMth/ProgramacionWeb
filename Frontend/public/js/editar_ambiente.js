document.addEventListener('DOMContentLoaded', function() {
    const id = window.location.pathname.split('/').pop();
    if (!id) {
        alert('ID del aula no especificado');
        return;
    }

    // Cargar detalles del aula
    fetch(`/api/aula/${id}`)
        .then(response => response.json())
        .then(aula => {
            document.getElementById('nombre').value = aula.nombre;
            document.getElementById('descripcion').value = aula.descripcion;
            document.getElementById('capacidad').value = aula.capacidad;
            document.getElementById('activo').checked = Boolean(aula.activo);
            document.getElementById('tipo').value = aula.tipo;
            document.getElementById('facilidades').value = aula.facilidades;
        })
        .catch(error => {
            console.error('Error al obtener detalles del aula:', error);
        });

    // Lógica para guardar cambios (ajustar según tus necesidades)
    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const id = window.location.pathname.split('/').pop();
        const data = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            capacidad: document.getElementById('capacidad').value,
            activo: document.getElementById('activo').checked ? 1 : 0,
            tipoAmbienteId: document.getElementById('tipo').value,
            facilidades: Array.from(document.getElementById('facilidades').selectedOptions).map(option => option.value)
        };
    
        fetch(`/api/aula/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Aula actualizada con éxito!');
                window.location.href = '/ver_aulas';
            } else {
                alert('Hubo un error al actualizar el aula.' + result.detailedError);
            }
        })
        .catch(error => {
            console.error('Error al actualizar el aula:', error);
        });
    });
    
    
        // Cargar tipos de ambientes
    fetch('/api/tipos_ambientes')
    .then(response => response.json())
    .then(tipos => {
        const tipoSelect = document.getElementById('tipo');
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.nombre;
            tipoSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener tipos de ambientes:', error);
    });

    // Cargar facilidades
    fetch('/api/facilidades')
    .then(response => response.json())
    .then(facilidades => {
        const facilidadesSelect = document.getElementById('facilidades');
        facilidades.forEach(facilidad => {
            const option = document.createElement('option');
            option.value = facilidad.id;
            option.textContent = facilidad.nombre;
            facilidadesSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener facilidades:', error);
    });
});
