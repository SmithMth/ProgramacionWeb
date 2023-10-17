
function cardAction() {
    var modal = document.getElementById("form-encimado");
    modal.classList.remove("ocultar");
}

function closeModal() {
    var modal = document.getElementById("form-encimado");
    modal.classList.add("ocultar");
}



document.getElementById("form-encimado").addEventListener("click", function(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});
