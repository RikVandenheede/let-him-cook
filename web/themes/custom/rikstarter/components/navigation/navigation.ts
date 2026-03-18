((Drupal, once) => {
  Drupal.behaviors.navigation = {
    attach() {
      const toggles = once('toggle', '.nav__toggle');

      if (toggles.length === 0) return;

      toggles.forEach(toggle => {
        const menu = toggle.closest('.nav')?.querySelector('.nav__menu');

        if (!menu) return;

        toggle.addEventListener('click', () => {
          toggle.classList.toggle('open');
          menu.classList.toggle('open');
        })
      })
    },
  };
})(Drupal, once);
