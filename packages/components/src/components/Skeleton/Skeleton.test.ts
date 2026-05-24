import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Skeleton from './Skeleton.vue';

describe('Skeleton', () => {
  it('has role="status" for single text line', () => {
    render(Skeleton, { props: { variant: 'text', lines: 1 } });
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('has role="status" for multi-line text', () => {
    render(Skeleton, { props: { variant: 'text', lines: 3 } });
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('has role="status" for circle', () => {
    render(Skeleton, { props: { variant: 'circle' } });
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('has role="status" for rect', () => {
    render(Skeleton, { props: { variant: 'rect' } });
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('renders multiple divs for multi-line text', () => {
    const { container } = render(Skeleton, { props: { variant: 'text', lines: 4 } });
    const lines = container.querySelectorAll('.animate-pulse');
    expect(lines.length).toBe(4);
  });

  it('applies custom width to circle', () => {
    render(Skeleton, { props: { variant: 'circle', width: '64px', height: '64px' } });
    const el = screen.getByRole('status');
    expect(el.getAttribute('style')).toContain('width: 64px');
    expect(el.getAttribute('style')).toContain('height: 64px');
  });

  it('applies custom dimensions to rect', () => {
    render(Skeleton, { props: { variant: 'rect', width: '100%', height: '200px' } });
    const el = screen.getByRole('status');
    expect(el.getAttribute('style')).toContain('height: 200px');
  });

  it('has sr-only loading text', () => {
    render(Skeleton);
    expect(screen.getByText('Cargando...')).toBeTruthy();
  });
});
