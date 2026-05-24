import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Badge from './Badge.vue';

describe('Badge', () => {
  it('renderiza el contenido del slot', () => {
    render(Badge, { slots: { default: 'Nuevo' } });
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  it('variante default aplica clases grises', () => {
    const { container } = render(Badge, { slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('bg-gray-100', 'text-gray-900');
  });

  it('variante primary aplica clases de primary', () => {
    const { container } = render(Badge, { props: { variant: 'primary' }, slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('bg-primary/15');
  });

  it('variante success aplica clases de success', () => {
    const { container } = render(Badge, { props: { variant: 'success' }, slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('bg-success/15');
  });

  it('variante danger aplica clases de danger', () => {
    const { container } = render(Badge, { props: { variant: 'danger' }, slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('bg-danger/15');
  });

  it('variante warning aplica clases de amber', () => {
    const { container } = render(Badge, { props: { variant: 'warning' }, slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('bg-amber-100', 'text-amber-700');
  });

  it('muestra el punto indicador cuando dot=true', () => {
    const { container } = render(Badge, { props: { dot: true }, slots: { default: 'Tag' } });
    const dot = container.querySelector('.rounded-full.bg-current');
    expect(dot).toBeInTheDocument();
  });

  it('no muestra el punto indicador por defecto', () => {
    const { container } = render(Badge, { slots: { default: 'Tag' } });
    expect(container.querySelector('.bg-current')).toBeNull();
  });

  it('tamaño sm aplica clases más pequeñas', () => {
    const { container } = render(Badge, { props: { size: 'sm' }, slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('px-1.5');
  });

  it('tamaño md aplica clases estándar', () => {
    const { container } = render(Badge, { props: { size: 'md' }, slots: { default: 'Tag' } });
    expect(container.firstElementChild).toHaveClass('px-2');
  });
});
