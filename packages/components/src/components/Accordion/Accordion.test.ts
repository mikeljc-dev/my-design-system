import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Accordion from './Accordion.vue';

const items = [
  { id: 'a1', title: 'Pregunta uno' },
  { id: 'a2', title: 'Pregunta dos' },
  { id: 'a3', title: 'Deshabilitada', disabled: true },
];

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(Accordion, { props: { items } });
    expect(screen.getByText('Pregunta uno')).toBeTruthy();
    expect(screen.getByText('Pregunta dos')).toBeTruthy();
  });

  it('buttons are collapsed by default (aria-expanded=false)', () => {
    render(Accordion, { props: { items } });
    const btns = screen.getAllByRole('button');
    expect(btns[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('expands on click', async () => {
    render(Accordion, { props: { items } });
    await fireEvent.click(screen.getByText('Pregunta uno'));
    expect(screen.getAllByRole('button')[0].getAttribute('aria-expanded')).toBe('true');
  });

  it('collapses previous when multiple=false', async () => {
    render(Accordion, { props: { items, multiple: false } });
    await fireEvent.click(screen.getByText('Pregunta uno'));
    await fireEvent.click(screen.getByText('Pregunta dos'));
    const btns = screen.getAllByRole('button');
    expect(btns[0].getAttribute('aria-expanded')).toBe('false');
    expect(btns[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps both open when multiple=true', async () => {
    render(Accordion, { props: { items, multiple: true } });
    await fireEvent.click(screen.getByText('Pregunta uno'));
    await fireEvent.click(screen.getByText('Pregunta dos'));
    const btns = screen.getAllByRole('button');
    expect(btns[0].getAttribute('aria-expanded')).toBe('true');
    expect(btns[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('disabled item cannot be opened', async () => {
    render(Accordion, { props: { items } });
    await fireEvent.click(screen.getByText('Deshabilitada'));
    expect(screen.getAllByRole('button')[2].getAttribute('aria-expanded')).toBe('false');
  });

  it('respects defaultOpen', () => {
    render(Accordion, { props: { items, defaultOpen: ['a1'] } });
    expect(screen.getAllByRole('button')[0].getAttribute('aria-expanded')).toBe('true');
  });
});
