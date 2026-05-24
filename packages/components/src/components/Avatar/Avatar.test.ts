import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar.vue';

describe('Avatar', () => {
  it('muestra las iniciales del nombre', () => {
    render(Avatar, { props: { name: 'John Doe' } });
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('solo usa las dos primeras iniciales', () => {
    render(Avatar, { props: { name: 'Ana María García' } });
    expect(screen.getByText('AM')).toBeInTheDocument();
  });

  it('muestra la imagen cuando se pasa src', () => {
    render(Avatar, { props: { src: 'https://example.com/avatar.jpg', alt: 'Mi avatar' } });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'Mi avatar');
  });

  it('muestra el SVG de fallback cuando no hay src ni name', () => {
    const { container } = render(Avatar);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('tiene aria-label con el nombre', () => {
    const { container } = render(Avatar, { props: { name: 'María López' } });
    expect(container.firstElementChild).toHaveAttribute('aria-label', 'María López');
  });

  it('aplica clase de tamaño sm', () => {
    const { container } = render(Avatar, { props: { name: 'AB', size: 'sm' } });
    expect(container.firstElementChild).toHaveClass('w-7', 'h-7');
  });

  it('aplica clase de tamaño lg', () => {
    const { container } = render(Avatar, { props: { name: 'AB', size: 'lg' } });
    expect(container.firstElementChild).toHaveClass('w-12', 'h-12');
  });

  it('aplica clase de tamaño xl', () => {
    const { container } = render(Avatar, { props: { name: 'AB', size: 'xl' } });
    expect(container.firstElementChild).toHaveClass('w-16', 'h-16');
  });

  it('tamaño md por defecto', () => {
    const { container } = render(Avatar, { props: { name: 'AB' } });
    expect(container.firstElementChild).toHaveClass('w-9', 'h-9');
  });
});
