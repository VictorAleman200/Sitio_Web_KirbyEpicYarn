// scriptMedia.js — miniaturas automaticas de YouTube, reproductor emergente y boton de subir
document.addEventListener('DOMContentLoaded', () => {

    /* ===== Miniaturas: se arman solas a partir del data-id de cada tarjeta ===== */
    document.querySelectorAll('.video-card').forEach(card => {
        const img = card.querySelector('.video-thumb img');
        const id = card.dataset.id;
        if (img && id && !img.getAttribute('src')) {
            img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        }
    });

    /* ===== Reproductor emergente ===== */
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
        <button class="modal-cerrar" aria-label="Cerrar">&times;</button>
        <iframe src="" title="Reproductor de video" allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen></iframe>
        <span class="modal-titulo"></span>
    `;
    document.body.appendChild(modal);

    const iframe = modal.querySelector('iframe');
    const titulo = modal.querySelector('.modal-titulo');
    const btnCerrar = modal.querySelector('.modal-cerrar');

    function abrir(card) {
        const id = card.dataset.id;
        const nombre = card.querySelector('h3')?.textContent.trim() || '';
        iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        iframe.title = nombre || 'Reproductor de video';
        titulo.textContent = nombre;
        titulo.style.display = nombre ? '' : 'none';
        modal.classList.add('activo');
        document.body.classList.add('sin-scroll');
    }

    function cerrar() {
        modal.classList.remove('activo');
        document.body.classList.remove('sin-scroll');
        iframe.src = ''; // detiene el video al cerrar
    }

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', e => {
            e.preventDefault(); // sin JS, el enlace abre el video en YouTube
            abrir(card);
        });
    });

    // clic en el fondo oscuro (no sobre el video) o en la X cierra
    modal.addEventListener('click', e => {
        if (e.target !== iframe) cerrar();
    });
    btnCerrar.addEventListener('click', cerrar);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') cerrar();
    });

    /* ===== Boton volver arriba ===== */
    const btnSubir = document.createElement('button');
    btnSubir.className = 'btn-subir';
    btnSubir.setAttribute('aria-label', 'Volver arriba');
    btnSubir.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btnSubir);
});