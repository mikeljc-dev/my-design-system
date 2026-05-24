import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Checkbox from './Checkbox.vue';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(Checkbox, { props: { modelValue: false, label: 'Acepto términos' } });
    expect(screen.getByText('Acepto términos')).toBeTruthy();
  });

  it('has role="checkbox"', () => {
    render(Checkbox, { props: { modelValue: false, label: 'Test' } });
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('aria-checked is false when unchecked', () => {
    render(Checkbox, { props: { modelValue: false, label: 'Test' } });
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('false');
  });

  it('aria-checked is true when checked', () => {
    render(Checkbox, { props: { modelValue: true, label: 'Test' } });
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('true');
  });

  it('aria-checked is mixed when indeterminate', () => {
    render(Checkbox, { props: { modelValue: false, indeterminate: true, label: 'Test' } });
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('mixed');
  });

  it('emits update:modelValue on click', async () => {
    const { emitted } = render(Checkbox, { props: { modelValue: false, label: 'Test' } });
    await fireEvent.click(screen.getByRole('checkbox'));
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual([true]);
  });

  it('does not emit when disabled', async () => {
    const { emitted } = render(Checkbox, { props: { modelValue: false, disabled: true, label: 'Test' } });
    await fireEvent.click(screen.getByRole('checkbox'));
    expect(emitted()['update:modelValue']).toBeFalsy();
  });

  it('shows error message', () => {
    render(Checkbox, { props: { modelValue: false, label: 'Test', error: 'Campo requerido' } });
    expect(screen.getByText('Campo requerido')).toBeTruthy();
  });

  it('shows hint', () => {
    render(Checkbox, { props: { modelValue: false, label: 'Test', hint: 'Info adicional' } });
    expect(screen.getByText('Info adicional')).toBeTruthy();
  });
});
