import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Switch from './Switch.vue';

describe('Switch', () => {
  it('has role="switch"', () => {
    render(Switch, { props: { modelValue: false, label: 'Activar' } });
    expect(screen.getByRole('switch')).toBeTruthy();
  });

  it('aria-checked is false when off', () => {
    render(Switch, { props: { modelValue: false, label: 'Activar' } });
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('false');
  });

  it('aria-checked is true when on', () => {
    render(Switch, { props: { modelValue: true, label: 'Activar' } });
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
  });

  it('emits toggle on click', async () => {
    const { emitted } = render(Switch, { props: { modelValue: false, label: 'Activar' } });
    await fireEvent.click(screen.getByRole('switch'));
    expect(emitted()['update:modelValue']).toBeTruthy();
    expect(emitted()['update:modelValue'][0]).toEqual([true]);
  });

  it('does not emit when disabled', async () => {
    const { emitted } = render(Switch, { props: { modelValue: false, disabled: true, label: 'Activar' } });
    await fireEvent.click(screen.getByRole('switch'));
    expect(emitted()['update:modelValue']).toBeFalsy();
  });

  it('renders label', () => {
    render(Switch, { props: { modelValue: false, label: 'Modo oscuro' } });
    expect(screen.getByText('Modo oscuro')).toBeTruthy();
  });

  it('applies sm size class', () => {
    render(Switch, { props: { modelValue: false, size: 'sm' } });
    const track = screen.getByRole('switch');
    expect(track.classList.contains('w-8')).toBe(true);
  });

  it('applies lg size class', () => {
    render(Switch, { props: { modelValue: false, size: 'lg' } });
    const track = screen.getByRole('switch');
    expect(track.classList.contains('w-14')).toBe(true);
  });
});
