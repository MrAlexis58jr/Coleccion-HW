document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.car-card');
            if (card) {
                card.classList.toggle('owned');
            }
        });
    });
});