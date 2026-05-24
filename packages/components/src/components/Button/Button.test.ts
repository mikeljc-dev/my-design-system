import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('renderiza el slot correctamente', () => {
    render(Button, { slots: { default: 'Guardar' } });
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  it('emite click al hacer click', async () => {
    const onClick = vi.fn();
    render(Button, { props: { onClick } });
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('no emite click si disabled=true', async () => {
    const onClick = vi.fn();
    render(Button, { props: { disabled: true, onClick } });
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('muestra aria-busy=true en estado loading', () => {
    render(Button, { props: { loading: true } });
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('aplica clases de danger correctamente', () => {
    render(Button, { props: { variant: 'danger' } });
    expect(screen.getByRole('button')).toHaveClass('bg-danger');
  });

  it('aplica clases de tamaño lg correctamente', () => {
    render(Button, { props: { size: 'lg' } });
    expect(screen.getByRole('button')).toHaveClass('text-base');
  });

  it('renderiza como enlace con prop as="a"', () => {
    render(Button, { props: { as: 'a' }, slots: { default: 'Ver más' } });
    expect(screen.getByText('Ver más').closest('a')).toBeInTheDocument();
  });
});
