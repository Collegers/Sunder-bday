// JavaScript for Lightbox
const images = document.querySelectorAll('.gallery-item img');
images.forEach(image => {
    image.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${this.src}" alt="Full Image">
            </div>
            <span class="close-btn">&times;</span>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
    });
});
