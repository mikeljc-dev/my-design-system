import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Select from './Select.vue';

const options = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
];

describe('Select', () => {
  it('renders a select element', () => {
    render(Select, { props: { options, modelValue: '' } });
    expect(screen.getByRole('combobox')).toBeTruthy();
  });

  it('renders label', () => {
    render(Select, { props: { options, modelValue: '', label: 'País' } });
    expect(screen.getByText('País')).toBeTruthy();
  });

  it('renders all options', () => {
    render(Select, { props: { options, modelValue: '' } });
    expect(screen.getByRole('option', { name: 'España' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'México' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Argentina' })).toBeTruthy();
  });

  it('renders placeholder option', () => {
    render(Select, { props: { options, modelValue: '', placeholder: 'Elige uno' } });
    expect(screen.getByRole('option', { name: 'Elige uno' })).toBeTruthy();
  });

  it('emits update:modelValue on change', async () => {
    const { emitted } = render(Select, { props: { options, modelValue: '' } });
    await fireEvent.change(screen.getByRole('combobox'), { target: { value: 'mx' } });
    expect(emitted()['update:modelValue']).toBeTruthy();
  });

  it('shows error message', () => {
    render(Select, { props: { options, modelValue: '', error: 'Campo requerido' } });
    expect(screen.getByText('Campo requerido')).toBeTruthy();
  });

  it('shows hint message', () => {
    render(Select, { props: { options, modelValue: '', hint: 'Elige tu país' } });
    expect(screen.getByText('Elige tu país')).toBeTruthy();
  });

  it('applies aria-invalid when error', () => {
    render(Select, { props: { options, modelValue: '', error: 'Error' } });
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBe('true');
  });

  it('is disabled when disabled prop is true', () => {
    render(Select, { props: { options, modelValue: '', disabled: true } });
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
