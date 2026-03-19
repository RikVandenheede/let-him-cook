((Drupal, once) => {
  Drupal.behaviors.navigation = {
    attach() {
      const toggles = once('toggle', '.nav__toggle');

      if (toggles.length === 0) return;

      toggles.forEach(toggle => {
        const menu = toggle.closest('.nav')?.querySelector('.nav__menu');
        const overlay = toggle.closest('.nav')?.querySelector('.nav__overlay');

        if (!menu || !overlay) return;

        toggle.addEventListener('click', () => {
          const isOpen = menu.classList.toggle('open');
          toggle.classList.toggle('open');
          (overlay as HTMLElement).setAttribute('aria-hidden', String(!isOpen));
          document.documentElement.classList.toggle('no-scroll');
        })
      })
    },
  };
})(Drupal, once);
