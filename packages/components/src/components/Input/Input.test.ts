import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Input from './Input.vue';

describe('Input', () => {
  it('renderiza el label correctamente', () => {
    render(Input, { props: { label: 'Email', modelValue: '' } });
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('emite update:modelValue al escribir', async () => {
    const { emitted } = render(Input, { props: { modelValue: '' } });
    await fireEvent.input(screen.getByRole('textbox'), { target: { value: 'hola' } });
    expect(emitted()['update:modelValue']).toBeTruthy();
  });

  it('muestra el mensaje de error', () => {
    render(Input, { props: { modelValue: '', error: 'Campo requerido' } });
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
  });

  it('aplica aria-invalid cuando hay error', () => {
    render(Input, { props: { modelValue: '', error: 'Error' } });
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('el input está deshabilitado cuando disabled=true', () => {
    render(Input, { props: { modelValue: '', disabled: true } });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
