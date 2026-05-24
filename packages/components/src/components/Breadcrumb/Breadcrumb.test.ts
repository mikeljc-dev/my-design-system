import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Breadcrumb from './Breadcrumb.vue';

const items = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/products' },
  { label: 'Detalle', current: true },
];

describe('Breadcrumb', () => {
  it('renders nav with aria-label', () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeTruthy();
  });

  it('renders all item labels', () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.getByText('Detalle')).toBeTruthy();
  });

  it('renders links for items with href', () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy();
  });

  it('renders current item without link', () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.queryByRole('link', { name: 'Detalle' })).toBeNull();
  });

  it('marks current item with aria-current="page"', () => {
    render(Breadcrumb, { props: { items } });
    const currentEl = screen.getByText('Detalle');
    expect(currentEl.getAttribute('aria-current')).toBe('page');
  });

  it('renders separators between items', () => {
    render(Breadcrumb, { props: { items, separator: '/' } });
    const seps = screen.getAllByText('/');
    expect(seps.length).toBe(2);
  });

  it('renders custom separator', () => {
    render(Breadcrumb, { props: { items, separator: '›' } });
    expect(screen.getAllByText('›').length).toBe(2);
  });
});
