import { config } from '@vue/test-utils';
import ResizeObserverPolyfill from 'resize-observer-polyfill';
import { vi } from 'vitest';
import vuetify from '@/plugins/vuetify';
import store from '@/stores/store';

/* eslint-disable no-restricted-globals */
beforeEach(() => {
  config.global.plugins = [vuetify, store];
  config.global.renderStubDefaultSlot = true;
  global.ResizeObserver = ResizeObserverPolyfill;
  global.Image = class {
    onload: () => void = () => {};
    onerror: () => void = () => {};
    src: string = '';
  } as unknown as typeof Image;
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn()
    },
    writable: true
  });
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn().mockResolvedValue('')
    },
    writable: true
  });
  Object.defineProperty(window, 'visualViewport', {
    value: {
      width: 1024,
      height: 768,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
    writable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
