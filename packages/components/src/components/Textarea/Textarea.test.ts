import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Textarea from './Textarea.vue';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(Textarea);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('renders label', () => {
    render(Textarea, { props: { label: 'Descripción' } });
    expect(screen.getByText('Descripción')).toBeTruthy();
  });

  it('emits update:modelValue on input', async () => {
    const { emitted } = render(Textarea, { props: { modelValue: '' } });
    await fireEvent.input(screen.getByRole('textbox'), { target: { value: 'Hola' } });
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual(['Hola']);
  });

  it('shows error message', () => {
    render(Textarea, { props: { error: 'Campo obligatorio' } });
    expect(screen.getByText('Campo obligatorio')).toBeTruthy();
  });

  it('shows hint message', () => {
    render(Textarea, { props: { hint: 'Máximo 200 caracteres' } });
    expect(screen.getByText('Máximo 200 caracteres')).toBeTruthy();
  });

  it('applies aria-invalid when error', () => {
    render(Textarea, { props: { error: 'Error' } });
    expect(screen.getByRole('textbox').getAttribute('aria-invalid')).toBe('true');
  });

  it('is disabled when disabled is true', () => {
    render(Textarea, { props: { disabled: true } });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows char counter when maxlength is set', () => {
    render(Textarea, { props: { maxlength: 160, modelValue: 'Hola' } });
    expect(screen.getByText('4/160')).toBeTruthy();
  });

  it('does not show char counter without maxlength', () => {
    render(Textarea, { props: { modelValue: 'Hola' } });
    expect(screen.queryByText(/\d+\/\d+/)).toBeNull();
  });
});
