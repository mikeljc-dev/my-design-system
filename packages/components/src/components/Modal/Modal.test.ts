import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, afterEach } from 'vitest';
import { nextTick } from 'vue';
import Modal from './Modal.vue';

afterEach(() => {
  document.body.style.overflow = '';
});

describe('Modal', () => {
  it('no renderiza nada cuando modelValue=false', () => {
    render(Modal, { props: { modelValue: false } });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renderiza el dialog cuando modelValue=true', () => {
    render(Modal, { props: { modelValue: true } });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('muestra el título cuando se pasa la prop title', () => {
    render(Modal, { props: { modelValue: true, title: 'Mi Modal' } });
    expect(screen.getByText('Mi Modal')).toBeInTheDocument();
  });

  it('renderiza el contenido del slot', () => {
    render(Modal, { props: { modelValue: true }, slots: { default: 'Contenido del modal' } });
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument();
  });

  it('renderiza el slot footer cuando se proporciona', () => {
    render(Modal, { props: { modelValue: true }, slots: { default: 'x', footer: 'Aceptar' } });
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
  });

  it('emite update:modelValue false al hacer click en cerrar', async () => {
    const { emitted } = render(Modal, { props: { modelValue: true } });
    await fireEvent.click(screen.getByLabelText('Cerrar modal'));
    expect((emitted()['update:modelValue'][0] as any[])[0]).toBe(false);
  });

  it('emite close al hacer click en cerrar', async () => {
    const { emitted } = render(Modal, { props: { modelValue: true } });
    await fireEvent.click(screen.getByLabelText('Cerrar modal'));
    expect(emitted().close).toBeTruthy();
  });

  it('cierra al pulsar Escape', async () => {
    const { emitted } = render(Modal, { props: { modelValue: true } });
    await fireEvent.keyDown(document, { key: 'Escape' });
    expect((emitted()['update:modelValue'][0] as any[])[0]).toBe(false);
  });

  it('cierra al hacer click en el backdrop cuando closeOnBackdrop=true', async () => {
    const { emitted, container } = render(Modal, { props: { modelValue: true, closeOnBackdrop: true } });
    const backdrop = container.ownerDocument.querySelector('.fixed.inset-0') as HTMLElement;
    await fireEvent.click(backdrop!, { target: backdrop });
    expect(emitted()['update:modelValue']).toBeTruthy();
  });

  it('aplica max-w-sm para size=sm', async () => {
    render(Modal, { props: { modelValue: true, size: 'sm' } });
    await nextTick();
    expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');
  });

  it('aplica max-w-3xl para size=lg', async () => {
    render(Modal, { props: { modelValue: true, size: 'lg' } });
    await nextTick();
    expect(screen.getByRole('dialog')).toHaveClass('max-w-3xl');
  });

  it('bloquea el scroll del body cuando se abre', async () => {
    const { rerender } = render(Modal, { props: { modelValue: false } });
    await rerender({ modelValue: true });
    await nextTick();
    expect(document.body.style.overflow).toBe('hidden');
  });
});
