((Drupal, once) => {
  Drupal.behaviors.navigation = {
    attach() {
      const toggles = once('toggle', '.nav__toggle');

      if (toggles.length === 0) return;

      toggles.forEach(toggle => {
        const nav = toggle.closest('.nav');
        const menu = nav?.querySelector('.nav__menu');
        const overlay = nav?.querySelector('.nav__overlay');

        if (!menu || !overlay) return;

        const closeNav = () => {
          menu.classList.remove('open');
          toggle.classList.remove('open');
          (overlay as HTMLElement).setAttribute('aria-hidden', 'true');
          document.documentElement.classList.remove('no-scroll');
        };

        const openNav = () => {
          menu.classList.add('open');
          toggle.classList.add('open');
          (overlay as HTMLElement).setAttribute('aria-hidden', 'false');
          document.documentElement.classList.add('no-scroll');
        };

        toggle.addEventListener('click', () => {
          if (menu.classList.contains('open')) {
            closeNav();
          } else {
            openNav();
          }
        });

        overlay.addEventListener('click', closeNav);
      });
    },
  };
})(Drupal, once);
