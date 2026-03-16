((Drupal, once) => {
  'use strict';

  Drupal.behaviors.main = {
    attach(context: Document | HTMLElement) {
      console.log('test')
    },
  };
})(Drupal, once);
