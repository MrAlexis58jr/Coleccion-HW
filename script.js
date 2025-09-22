document.addEventListener('DOMContentLoaded', () => {
    const carCards = document.querySelectorAll('.car-card');
    const STORAGE_KEY = 'hotWheelsCollection';

    // Función para actualizar el texto del botón
    const updateButtonText = (card) => {
        const button = card.querySelector('.toggle-button');
        if (card.classList.contains('owned')) {
            button.textContent = 'Lo tengo';
        } else {
            button.textContent = 'No lo tengo';
        }
    };

    // Función para guardar el estado de la colección en localStorage
    const saveCollection = () => {
        const ownedCars = Array.from(document.querySelectorAll('.car-card.owned'))
                               .map(card => card.dataset.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedCars));
    };

    // Función para cargar el estado de la colección desde localStorage al inicio
    const loadCollection = () => {
        const storedCollection = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (storedCollection) {
            carCards.forEach(card => {
                const carId = card.dataset.id;
                if (storedCollection.includes(carId)) {
                    card.classList.add('owned');
                } else {
                    card.classList.remove('owned');
                }
                updateButtonText(card);
            });
        } else {
            // Si no hay datos guardados, inicializa los botones según la clase "owned" del HTML
            carCards.forEach(updateButtonText);
        }
    };

    // Cargar la colección al iniciar la página
    loadCollection();

    // Añadir el evento de clic a cada tarjeta
    carCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Asegurarse de que el clic es en el botón o dentro de la tarjeta
            if (event.target.tagName === 'BUTTON' || event.target.closest('.car-card')) {
                card.classList.toggle('owned');
                updateButtonText(card);
                saveCollection(); // Guardar el estado después de cada cambio
            }
        });
    });
});
