import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { nextTick } from 'vue';
import Tooltip from './Tooltip.vue';

async function showTooltip(container: Element) {
  await fireEvent.mouseEnter(container.firstElementChild!);
  vi.runAllTimers();
  await nextTick();
}

describe('Tooltip', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('renders slot content (trigger)', () => {
    render(Tooltip, {
      props: { content: 'Ayuda' },
      slots: { default: '<button>Hover me</button>' },
    });
    expect(screen.getByText('Hover me')).toBeTruthy();
  });

  it('tooltip is hidden by default', () => {
    render(Tooltip, {
      props: { content: 'Ayuda' },
      slots: { default: '<button>Hover</button>' },
    });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows tooltip on mouseenter', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Texto de ayuda', delay: 0 },
      slots: { default: '<button>Hover</button>' },
    });
    await showTooltip(container);
    expect(screen.getByRole('tooltip')).toBeTruthy();
    expect(screen.getByText('Texto de ayuda')).toBeTruthy();
  });

  it('hides tooltip on mouseleave', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Ayuda', delay: 0 },
      slots: { default: '<button>Hover</button>' },
    });
    await showTooltip(container);
    expect(screen.getByRole('tooltip')).toBeTruthy();
    await fireEvent.mouseLeave(container.firstElementChild!);
    await nextTick();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('shows tooltip on focusin', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Focus ayuda', delay: 0 },
      slots: { default: '<button>Focus</button>' },
    });
    const triggerWrapper = container.querySelector('.inline-flex .inline-flex')!;
    await fireEvent.focusIn(triggerWrapper);
    vi.runAllTimers();
    await nextTick();
    expect(screen.getByRole('tooltip')).toBeTruthy();
  });

  it('tooltip has correct content', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Contenido exacto', delay: 0 },
      slots: { default: '<span>T</span>' },
    });
    await showTooltip(container);
    expect(screen.getByRole('tooltip').textContent?.trim()).toContain('Contenido exacto');
  });

  it('applies top placement classes', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Top', placement: 'top', delay: 0 },
      slots: { default: '<span>T</span>' },
    });
    await showTooltip(container);
    expect(screen.getByRole('tooltip').classList.contains('bottom-full')).toBe(true);
  });

  it('applies bottom placement classes', async () => {
    const { container } = render(Tooltip, {
      props: { content: 'Bottom', placement: 'bottom', delay: 0 },
      slots: { default: '<span>B</span>' },
    });
    await showTooltip(container);
    expect(screen.getByRole('tooltip').classList.contains('top-full')).toBe(true);
  });
});
