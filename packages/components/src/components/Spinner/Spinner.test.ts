import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Spinner from './Spinner.vue';

describe('Spinner', () => {
  it('has role="status"', () => {
    render(Spinner);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('renders sr-only label by default', () => {
    render(Spinner);
    expect(screen.getByText('Cargando...')).toBeTruthy();
  });

  it('renders custom label', () => {
    render(Spinner, { props: { label: 'Guardando datos' } });
    expect(screen.getByText('Guardando datos')).toBeTruthy();
  });

  it('applies md size class by default', () => {
    render(Spinner);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg?.classList.contains('w-6')).toBe(true);
  });

  it('applies sm size class', () => {
    render(Spinner, { props: { size: 'sm' } });
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg?.classList.contains('w-4')).toBe(true);
  });

  it('applies lg size class', () => {
    render(Spinner, { props: { size: 'lg' } });
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg?.classList.contains('w-8')).toBe(true);
  });

  it('applies xl size class', () => {
    render(Spinner, { props: { size: 'xl' } });
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg?.classList.contains('w-12')).toBe(true);
  });
});
