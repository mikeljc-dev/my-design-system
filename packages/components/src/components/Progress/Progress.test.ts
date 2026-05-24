import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/vue';
import Progress from './Progress.vue';

describe('Progress', () => {
  it('has role="progressbar"', () => {
    render(Progress, { props: { value: 50 } });
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('sets aria-valuenow', () => {
    render(Progress, { props: { value: 75 } });
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('75');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    render(Progress, { props: { value: 50, max: 200 } });
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('200');
  });

  it('renders label', () => {
    render(Progress, { props: { value: 50, label: 'Subiendo...' } });
    expect(screen.getByText('Subiendo...')).toBeTruthy();
  });

  it('renders percentage when showValue is true', () => {
    render(Progress, { props: { value: 72, showValue: true } });
    expect(screen.getByText('72%')).toBeTruthy();
  });

  it('does not render aria-valuenow when indeterminate', () => {
    render(Progress, { props: { indeterminate: true } });
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBeNull();
  });

  it('applies sm height class', () => {
    render(Progress, { props: { value: 50, size: 'sm' } });
    expect(screen.getByRole('progressbar').classList.contains('h-1')).toBe(true);
  });

  it('applies lg height class', () => {
    render(Progress, { props: { value: 50, size: 'lg' } });
    expect(screen.getByRole('progressbar').classList.contains('h-4')).toBe(true);
  });
});
