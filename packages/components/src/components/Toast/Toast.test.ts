import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Toast from './Toast.vue';

describe('Toast', () => {
  it('has role="alert"', () => {
    render(Toast, { props: { message: 'Guardado' } });
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('renders the message', () => {
    render(Toast, { props: { message: 'Operación exitosa' } });
    expect(screen.getByText('Operación exitosa')).toBeTruthy();
  });

  it('shows close button', () => {
    render(Toast, { props: { message: 'Test' } });
    expect(screen.getByLabelText('Cerrar notificación')).toBeTruthy();
  });

  it('emits close on button click', async () => {
    const { emitted } = render(Toast, { props: { message: 'Test' } });
    await fireEvent.click(screen.getByLabelText('Cerrar notificación'));
    expect(emitted().close).toBeTruthy();
  });

  it('applies info bg class by default', () => {
    render(Toast, { props: { message: 'Info' } });
    expect(screen.getByRole('alert').classList.contains('bg-slate-800')).toBe(true);
  });

  it('applies success bg class', () => {
    render(Toast, { props: { message: 'OK', type: 'success' } });
    expect(screen.getByRole('alert').classList.contains('bg-success-dark')).toBe(true);
  });

  it('applies danger bg class', () => {
    render(Toast, { props: { message: 'Error', type: 'danger' } });
    expect(screen.getByRole('alert').classList.contains('bg-danger-dark')).toBe(true);
  });

  it('applies warning bg class', () => {
    render(Toast, { props: { message: 'Atención', type: 'warning' } });
    expect(screen.getByRole('alert').classList.contains('bg-amber-700')).toBe(true);
  });
});
