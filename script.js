document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("star-container");
    const stars = [];
    let timer;

    // Crear estrellas en posiciones aleatorias
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.opacity = 1; // Asegurarse de que la estrella sea visible inicialmente
        container.appendChild(star);
        stars.push(star);
    }

    // Hacer que las estrellas sigan al mouse
    document.addEventListener("mousemove", function (event) {
        const x = event.clientX;
        const y = event.clientY;

        // Reiniciar el temporizador
        clearTimeout(timer);

        stars.forEach((star, index) => {
            const delay = index * 10;
            setTimeout(() => {
                star.style.transition = 'all 0.5s ease';
                star.style.left = `${x + Math.random() * 20 - 10}px`;
                star.style.top = `${y + Math.random() * 20 - 10}px`;
                star.style.opacity = 1; // Hacer la estrella completamente visible
            }, delay);
        });

        // Desvanecer las estrellas después de 1 segundo de inactividad del mouse
        timer = setTimeout(() => {
            stars.forEach(star => {
                star.style.transition = 'opacity 0.7s ease';
                star.style.opacity = 0; // Desvanecer la estrella
            });
        }, 1000);
    });
});
