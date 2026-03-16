/**
 * Drupal JavaScript API Type Definitions
 * Based on Drupal core JavaScript API
 */

/**
 * Behavior attach callback
 */
type BehaviorAttach = (context: Document | HTMLElement, settings: DrupalSettings) => void;

/**
 * Behavior detach callback
 */
type BehaviorDetach = (
  context: Document | HTMLElement,
  settings: DrupalSettings,
  trigger: 'unload' | 'move' | 'serialize'
) => void;

/**
 * Drupal behavior object
 */
interface DrupalBehavior {
  attach: BehaviorAttach;
  detach?: BehaviorDetach;
}

/**
 * Collection of Drupal behaviors
 */
interface DrupalBehaviors {
  [key: string]: DrupalBehavior;
}

/**
 * Drupal settings object
 */
interface DrupalSettings {
  [key: string]: unknown;
  path?: {
    baseUrl: string;
    pathPrefix: string;
  };
  pluralDelimiter?: string;
  suppressDeprecationErrors?: boolean;
}

/**
 * Drupal locale object with translation strings
 */
interface DrupalLocale {
  strings?: {
    [context: string]: {
      [source: string]: string;
    };
  };
  pluralFormula?: {
    [count: number]: number;
    default: number;
  };
}

/**
 * Displace offset object
 */
interface DisplaceOffset {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * Ajax element settings
 */
interface AjaxSettings {
  url?: string;
  event?: string | null;
  keypress?: boolean;
  selector?: string;
  effect?: string;
  speed?: string | number;
  method?: string;
  progress?:
    | {
        type?: 'throbber' | 'bar' | 'fullscreen';
        message?: string;
      }
    | false;
  submit?: {
    js?: boolean;
    [key: string]: unknown;
  };
  dialog?: Record<string, unknown>;
  dialogType?: 'modal' | 'dialog';
  dialogRenderer?: string;
  prevent?: string;
  base?: string;
  element?: HTMLElement;
  httpMethod?: string;
}

/**
 * Drupal Ajax instance
 */
interface DrupalAjax {
  instanceIndex: number;
  element: HTMLElement | false;
  execute(): void;
  commands: {
    [key: string]: (ajax: DrupalAjax, response: unknown, status: number | string) => void;
  };
}

/**
 * Dialog definition
 */
interface DialogDefinition {
  open: boolean;
  returnValue?: unknown;
  show(settings?: Record<string, unknown>): void;
  showModal(settings?: Record<string, unknown>): void;
  close(value?: unknown): void;
}

/**
 * Tabbing context
 */
interface TabbingContext {
  level: number | null;
  $tabbableElements: JQuery;
  $disabledElements: JQuery;
  released: boolean;
  active: boolean;
  trapFocus: boolean;
  release(): void;
  activate(): void;
  deactivate(): void;
}

/**
 * Tabbing manager
 */
interface TabbingManager {
  stack: TabbingContext[];
  constrain(options: { $tabbableElements?: JQuery; $disabledElements?: JQuery; trapFocus?: boolean }): TabbingContext;
}

/**
 * Message class instance
 */
interface DrupalMessage {
  messageWrapper: HTMLElement;
  add(
    message: string,
    options?: {
      id?: string;
      type?: 'status' | 'error' | 'warning';
      announce?: string;
      priority?: string;
    }
  ): HTMLElement;
  select(id: string): HTMLElement[];
  remove(id: string): boolean;
  clear(): void;
}

/**
 * Message class constructor
 */
interface DrupalMessageConstructor {
  new (messageWrapper?: HTMLElement | null): DrupalMessage;
  defaultWrapper(): HTMLElement;
  getMessageTypeLabels(): {
    status: string;
    error: string;
    warning: string;
  };
}

/**
 * Main Drupal namespace
 */
interface DrupalStatic {
  // Core properties
  settings: DrupalSettings;
  behaviors: DrupalBehaviors;
  locale: DrupalLocale;

  // Behavior methods
  attachBehaviors(context?: Document | HTMLElement, settings?: DrupalSettings): void;
  detachBehaviors(
    context?: Document | HTMLElement,
    settings?: DrupalSettings,
    trigger?: 'unload' | 'move' | 'serialize'
  ): void;

  // String and translation methods
  t(str: string, args?: { [key: string]: string | number }, options?: { context?: string }): string;
  formatPlural(
    count: number,
    singular: string,
    plural: string,
    args?: { [key: string]: string | number },
    options?: { context?: string }
  ): string;
  formatString(str: string, args: { [key: string]: string | number | boolean }): string;
  stringReplace(str: string, args: { [key: string]: string | number | boolean }, keys?: string[] | null): string;
  checkPlain(str: string): string;

  // URL methods
  url(path: string): string;
  encodePath(item: string): string;

  // Theme methods
  theme(func: string, ...args: unknown[]): string | Record<string, unknown> | HTMLElement | JQuery;

  // Utility methods
  throwError(error: Error | string): void;
  debounce<T extends (...args: never[]) => unknown>(func: T, wait: number, immediate?: boolean): T;
  announce(text: string, priority?: 'polite' | 'assertive'): void;
  elementIsVisible(elem: HTMLElement): boolean;
  elementIsHidden(elem: HTMLElement): boolean;

  // Deprecation methods
  deprecationError(options: { message: string }): void;
  deprecatedProperty<T extends Record<string, unknown>>(options: {
    target: T;
    deprecatedProperty: string;
    message: string;
  }): T;

  // Ajax functionality
  ajax(settings: AjaxSettings): DrupalAjax;
  Ajax: new (base: string | false, element: HTMLElement | false, elementSettings: AjaxSettings) => DrupalAjax;
  AjaxError: new (xmlhttp: XMLHttpRequest, uri: string, customMessage: string) => Error;

  // Dialog functionality
  dialog(element: HTMLElement, options?: Record<string, unknown>): DialogDefinition;

  // Displace (viewport offset management)
  displace: {
    offsets: DisplaceOffset;
    calculateOffset(edge: 'top' | 'left' | 'right' | 'bottom'): number;
  };

  // Message API
  Message: DrupalMessageConstructor;

  // Tabbing manager
  tabbingManager: TabbingManager;
}

declare const Drupal: DrupalStatic;
declare const drupalSettings: DrupalSettings;
declare const drupalTranslations: DrupalLocale;

/**
 * Once library - ensures behaviors are only attached once per element
 */
interface OnceFunction {
  (id: string, selector?: string, context?: Document | HTMLElement): HTMLElement[];
  filter(id: string, selector?: string, context?: Document | HTMLElement): HTMLElement[];
  remove(id: string, selector?: string, context?: Document | HTMLElement): HTMLElement[];
  find(id: string, context?: Document | HTMLElement): HTMLElement[];
}

declare const once: OnceFunction;
