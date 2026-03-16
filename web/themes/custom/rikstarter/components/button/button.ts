/**
 * @file
 * Button component behaviour.
 */
(function (Drupal) {
  Drupal.behaviors.button = {
    attach(context: HTMLElement) {
      const buttons = context.querySelectorAll<HTMLButtonElement>('.btn');
      buttons.forEach((btn) => {
        // Prevent double-submit on submit buttons.
        if (btn.type === 'submit') {
          btn.addEventListener('click', () => {
            btn.setAttribute('disabled', 'disabled');
            btn.classList.add('btn--disabled');
            setTimeout(() => {
              btn.removeAttribute('disabled');
              btn.classList.remove('btn--disabled');
            }, 3000);
          });
        }
      });
    },
  };
})(Drupal);
