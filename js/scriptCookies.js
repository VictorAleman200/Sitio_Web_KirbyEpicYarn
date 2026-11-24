// cookies.js — banner de cookies (guarda la eleccion en localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const CLAVE = 'cookiesConsent';
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const leer = () => {
        try { return JSON.parse(localStorage.getItem(CLAVE)); } catch (e) { return null; }
    };

    const guardar = (analiticas, marketing) => {
        const consent = { necesarias: true, analiticas, marketing, fecha: new Date().toISOString() };
        try { localStorage.setItem(CLAVE, JSON.stringify(consent)); } catch (e) { /* sin storage: se vuelve a preguntar */ }
        cerrar();
        // aqui puedes cargar tus scripts de analiticas/marketing segun lo elegido
        document.dispatchEvent(new CustomEvent('cookies:consent', { detail: consent }));
    };

    function cerrar() {
        banner.classList.remove('activo');
        setTimeout(() => { banner.hidden = true; }, 350);
    }

    function mostrar() {
        banner.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('activo')));
    }

    // si ya eligio antes, no se vuelve a mostrar
    if (leer()) return;
    mostrar();

    const config = banner.querySelector('.cookie-config');
    const chkAnaliticas = banner.querySelector('#cookie-analiticas');
    const chkMarketing = banner.querySelector('#cookie-marketing');
    const btnConfigurar = banner.querySelector('.configurar');

    banner.querySelector('.aceptar').addEventListener('click', () => guardar(true, true));
    banner.querySelector('.rechazar').addEventListener('click', () => guardar(false, false));

    btnConfigurar.addEventListener('click', () => {
        const abierto = config.classList.toggle('abierto');
        btnConfigurar.setAttribute('aria-expanded', abierto);
    });

    banner.querySelector('.guardar').addEventListener('click', () => {
        guardar(chkAnaliticas.checked, chkMarketing.checked);
    });
});