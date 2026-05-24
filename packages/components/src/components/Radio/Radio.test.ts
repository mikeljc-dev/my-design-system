import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Radio from './Radio.vue';

describe('Radio', () => {
  it('has role="radio"', () => {
    render(Radio, { props: { value: 'a', modelValue: '' } });
    expect(screen.getByRole('radio')).toBeTruthy();
  });

  it('aria-checked is false when not selected', () => {
    render(Radio, { props: { value: 'a', modelValue: 'b' } });
    expect(screen.getByRole('radio').getAttribute('aria-checked')).toBe('false');
  });

  it('aria-checked is true when selected', () => {
    render(Radio, { props: { value: 'a', modelValue: 'a' } });
    expect(screen.getByRole('radio').getAttribute('aria-checked')).toBe('true');
  });

  it('renders label', () => {
    render(Radio, { props: { value: 'a', modelValue: '', label: 'Opción A' } });
    expect(screen.getByText('Opción A')).toBeTruthy();
  });

  it('renders description', () => {
    render(Radio, { props: { value: 'a', modelValue: '', description: 'Descripción extra' } });
    expect(screen.getByText('Descripción extra')).toBeTruthy();
  });

  it('emits update:modelValue on click', async () => {
    const { emitted } = render(Radio, { props: { value: 'a', modelValue: '' } });
    await fireEvent.click(screen.getByRole('radio'));
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual(['a']);
  });

  it('does not emit when disabled', async () => {
    const { emitted } = render(Radio, { props: { value: 'a', modelValue: '', disabled: true } });
    await fireEvent.click(screen.getByRole('radio'));
    expect(emitted()['update:modelValue']).toBeFalsy();
  });
});
