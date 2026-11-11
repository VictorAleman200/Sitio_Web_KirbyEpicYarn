// scriptArte.js — lightbox de imagenes + boton para volver arriba
document.addEventListener('DOMContentLoaded', () => {

    /* ===== Lightbox ===== */
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = `
        <button class="lightbox-cerrar" aria-label="Cerrar">&times;</button>
        <img src="" alt="">
        <span class="lightbox-titulo"></span>
    `;
    document.body.appendChild(lightbox);

    const imgGrande = lightbox.querySelector('img');
    const titulo = lightbox.querySelector('.lightbox-titulo');
    const btnCerrar = lightbox.querySelector('.lightbox-cerrar');

    function abrir(img) {
        const nombre = img.closest('.contenedorR, .contenedorS')
            ?.querySelector('h3')?.textContent.trim() || img.alt || '';
        imgGrande.src = img.currentSrc || img.src;
        imgGrande.alt = img.alt;
        titulo.textContent = nombre;
        titulo.style.display = nombre ? '' : 'none';
        lightbox.classList.add('activo');
        document.body.classList.add('sin-scroll');
    }

    function cerrar() {
        lightbox.classList.remove('activo');
        document.body.classList.remove('sin-scroll');
    }

    document.querySelectorAll('.contenedorR img, .contenedorS img').forEach(img => {
        if (!img.getAttribute('src')) return; // ignora imagenes vacias
        img.addEventListener('click', () => abrir(img));
    });

    // clic en el fondo oscuro (no sobre la imagen) o en la X cierra
    lightbox.addEventListener('click', e => {
        if (e.target !== imgGrande) cerrar();
    });
    btnCerrar.addEventListener('click', cerrar);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') cerrar();
    });

    /* ===== Videos: miniaturas automaticas + reproductor emergente ===== */
    const videos = document.querySelectorAll('.video');

    videos.forEach(video => {
        const img = video.querySelector('.video-thumb img');
        const id = video.dataset.id;
        if (img && id && !img.getAttribute('src')) {
            img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        }
    });

    if (videos.length) {
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
        const tituloVideo = modal.querySelector('.modal-titulo');

        function abrirVideo(video) {
            const nombre = video.querySelector('h3')?.textContent.trim() || '';
            iframe.src = `https://www.youtube-nocookie.com/embed/${video.dataset.id}?autoplay=1&rel=0`;
            iframe.title = nombre || 'Reproductor de video';
            tituloVideo.textContent = nombre;
            tituloVideo.style.display = nombre ? '' : 'none';
            modal.classList.add('activo');
            document.body.classList.add('sin-scroll');
        }

        function cerrarVideo() {
            modal.classList.remove('activo');
            document.body.classList.remove('sin-scroll');
            iframe.src = ''; // detiene el video al cerrar
        }

        videos.forEach(video => {
            video.addEventListener('click', e => {
                e.preventDefault(); // sin JS, el enlace abre el video en YouTube
                abrirVideo(video);
            });
        });

        modal.addEventListener('click', e => {
            if (e.target !== iframe) cerrarVideo();
        });
        modal.querySelector('.modal-cerrar').addEventListener('click', cerrarVideo);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') cerrarVideo();
        });
    }

    /* ===== Boton volver arriba (siempre visible, esquina inferior derecha) ===== */
    const btnSubir = document.createElement('button');
    btnSubir.className = 'btn-subir';
    btnSubir.setAttribute('aria-label', 'Volver arriba');
    btnSubir.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btnSubir);
});