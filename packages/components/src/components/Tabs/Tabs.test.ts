import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Tabs from './Tabs.vue';

const tabs = [
  { id: 'tab1', label: 'Primera' },
  { id: 'tab2', label: 'Segunda' },
  { id: 'tab3', label: 'Tercera', disabled: true },
];

describe('Tabs', () => {
  it('renders all tabs', () => {
    render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    expect(screen.getByText('Primera')).toBeTruthy();
    expect(screen.getByText('Segunda')).toBeTruthy();
    expect(screen.getByText('Tercera')).toBeTruthy();
  });

  it('marks active tab with aria-selected', () => {
    render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    const tabEls = screen.getAllByRole('tab');
    expect(tabEls[0].getAttribute('aria-selected')).toBe('true');
    expect(tabEls[1].getAttribute('aria-selected')).toBe('false');
  });

  it('emits update:modelValue on tab click', async () => {
    const { emitted } = render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    await fireEvent.click(screen.getByText('Segunda'));
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual(['tab2']);
  });

  it('does not emit for disabled tab', async () => {
    const { emitted } = render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    await fireEvent.click(screen.getByText('Tercera'));
    expect(emitted()['update:modelValue']).toBeFalsy();
  });

  it('has role="tablist" container', () => {
    render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    expect(screen.getByRole('tablist')).toBeTruthy();
  });

  it('panels have role="tabpanel"', () => {
    render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    expect(screen.getAllByRole('tabpanel', { hidden: true }).length).toBe(3);
  });

  it('active panel is visible, others hidden', () => {
    render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(panels[0].hidden).toBe(false);
    expect(panels[1].hidden).toBe(true);
  });

  it('ArrowRight moves focus to next enabled tab', async () => {
    const { emitted } = render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    const tabEls = screen.getAllByRole('tab');
    await fireEvent.keyDown(tabEls[0], { key: 'ArrowRight' });
    expect(emitted()['update:modelValue']?.[0]).toEqual(['tab2']);
  });

  it('ArrowLeft moves focus to previous enabled tab', async () => {
    const { emitted } = render(Tabs, { props: { tabs, modelValue: 'tab2' } });
    const tabEls = screen.getAllByRole('tab');
    await fireEvent.keyDown(tabEls[1], { key: 'ArrowLeft' });
    expect(emitted()['update:modelValue']?.[0]).toEqual(['tab1']);
  });

  it('Home moves to first enabled tab', async () => {
    const { emitted } = render(Tabs, { props: { tabs, modelValue: 'tab2' } });
    const tabEls = screen.getAllByRole('tab');
    await fireEvent.keyDown(tabEls[1], { key: 'Home' });
    expect(emitted()['update:modelValue']?.[0]).toEqual(['tab1']);
  });

  it('End moves to last enabled tab', async () => {
    const { emitted } = render(Tabs, { props: { tabs, modelValue: 'tab1' } });
    const tabEls = screen.getAllByRole('tab');
    await fireEvent.keyDown(tabEls[0], { key: 'End' });
    expect(emitted()['update:modelValue']?.[0]).toEqual(['tab2']);
  });
});
