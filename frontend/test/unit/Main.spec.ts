import { createVueApp } from '@/main';
import { flushPromises } from '@vue/test-utils';

describe('main.ts', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render', async () => {
    expect(createVueApp()).toBeDefined();
    await flushPromises();
  });
});
