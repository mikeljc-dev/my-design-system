import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Alert from './Alert.vue';

describe('Alert', () => {
  it('has role="alert"', () => {
    render(Alert, { props: { type: 'info' }, slots: { default: 'Mensaje de prueba' } });
    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('renders slot content', () => {
    render(Alert, { props: { type: 'info' }, slots: { default: 'Mensaje de prueba' } });
    expect(screen.getByText('Mensaje de prueba')).toBeTruthy();
  });

  it('renders title when provided', () => {
    render(Alert, { props: { type: 'success', title: 'Éxito' }, slots: { default: 'OK' } });
    expect(screen.getByText('Éxito')).toBeTruthy();
  });

  it('does not render title when not provided', () => {
    render(Alert, { props: { type: 'info' }, slots: { default: 'Mensaje' } });
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('shows dismiss button when dismissible', () => {
    render(Alert, { props: { type: 'info', dismissible: true }, slots: { default: 'Mensaje' } });
    expect(screen.getByLabelText('Cerrar alerta')).toBeTruthy();
  });

  it('does not show dismiss button when not dismissible', () => {
    render(Alert, { props: { type: 'info' }, slots: { default: 'Mensaje' } });
    expect(screen.queryByLabelText('Cerrar alerta')).toBeNull();
  });

  it('emits dismiss event on close click', async () => {
    const { emitted } = render(Alert, {
      props: { type: 'warning', dismissible: true },
      slots: { default: 'Cuidado' },
    });
    await fireEvent.click(screen.getByLabelText('Cerrar alerta'));
    expect(emitted().dismiss).toBeTruthy();
  });

  it('applies info classes', () => {
    render(Alert, { props: { type: 'info' }, slots: { default: 'msg' } });
    expect(screen.getByRole('alert').className).toContain('border-primary');
  });

  it('applies danger classes', () => {
    render(Alert, { props: { type: 'danger' }, slots: { default: 'msg' } });
    expect(screen.getByRole('alert').className).toContain('border-danger');
  });
});
