// Carrusel
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-inner img');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) img.classList.add('active');
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    showImage(currentIndex);

    // Abrir modal al hacer click en el botón de cada casa
    document.querySelectorAll('.abrir-modal').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botón de modal clickeado:', this.getAttribute('data-modal')); // <-- Agregado
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Cerrar modal al hacer click en la X
    document.querySelectorAll('.modal .close').forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            btn.closest('.modal').style.display = 'none';
        };
    });

    // Cerrar modal al hacer click fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.onclick = function(e) {
            if (e.target === modal) modal.style.display = 'none';
        };
    });

    // Carrusel en cada modal
    document.querySelectorAll('.modal').forEach(modal => {
        const images = modal.querySelectorAll('.modal-carousel img');
        let idx = 0;
        const show = i => {
            images.forEach((img, j) => img.classList.toggle('active', j === i));
        };
        const prevBtn = modal.querySelector('.carousel-btn.prev');
        const nextBtn = modal.querySelector('.carousel-btn.next');
        if (prevBtn && nextBtn) {
            prevBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                idx = (idx - 1 + images.length) % images.length;
                show(idx);
            };
            nextBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                idx = (idx + 1) % images.length;
                show(idx);
            };
        }
        show(idx);
    });
});

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}
