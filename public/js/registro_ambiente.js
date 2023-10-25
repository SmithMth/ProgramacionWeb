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