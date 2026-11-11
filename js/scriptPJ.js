document.addEventListener('DOMContentLoaded', function () {
  const personajes = document.querySelectorAll('.pj');

  personajes.forEach(personaje => {
    personaje.addEventListener('click', function () {
      const info = this.querySelector('.pj-info');
      
      document.querySelectorAll('.pj-info').forEach(otherInfo => {
        if (otherInfo !== info) {
          otherInfo.classList.remove('info-act-left', 'info-act-right');
          otherInfo.style.zIndex = '';
        }
      });
      
      const isLeft = this.classList.contains('left');
      const isRight = this.classList.contains('right');
      
      if (info) {
        if (isLeft) {
            info.classList.toggle('info-act-left'); 
        } else if (isRight) {
            info.classList.toggle('info-act-right');
        }
        
        if (info.classList.contains('info-act-left') || info.classList.contains('info-act-right')) {
            info.style.zIndex = 4;
        } else {
            info.style.zIndex = '';
        }
      }
    });
  });
});