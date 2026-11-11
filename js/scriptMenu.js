document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.header-menu');
    const fondo = document.querySelector('.oscurecer-fondo')
    const burger = document.querySelector('.burgerIcon');
    const body = document.body;

    burger.addEventListener('click', () => {
        menu.classList.toggle('activo');
        fondo.classList.toggle('activo');
        body.classList.toggle('no-scroll');
    });

    fondo.addEventListener('click', () => {
        menu.classList.toggle('activo');
        fondo.classList.toggle('activo');
        body.classList.toggle('no-scroll');
    });
});