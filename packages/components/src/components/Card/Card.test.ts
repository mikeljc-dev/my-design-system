import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Card from './Card.vue';

describe('Card', () => {
  it('renderiza el contenido del slot por defecto', () => {
    render(Card, { slots: { default: 'Contenido de la card' } });
    expect(screen.getByText('Contenido de la card')).toBeInTheDocument();
  });

  it('renderiza el slot header cuando se proporciona', () => {
    render(Card, { slots: { header: 'Título de la card', default: 'Contenido' } });
    expect(screen.getByText('Título de la card')).toBeInTheDocument();
  });

  it('renderiza el slot footer cuando se proporciona', () => {
    render(Card, { slots: { footer: 'Pie de la card', default: 'Contenido' } });
    expect(screen.getByText('Pie de la card')).toBeInTheDocument();
  });

  it('no muestra header ni footer si no se pasan los slots', () => {
    const { container } = render(Card, { slots: { default: 'Contenido' } });
    const sections = container.querySelectorAll('.border-b, .border-t');
    expect(sections.length).toBe(0);
  });

  it('aplica borde por defecto (bordered=true)', () => {
    const { container } = render(Card, { slots: { default: 'x' } });
    expect(container.firstElementChild).toHaveClass('border');
  });

  it('no aplica borde cuando bordered=false', () => {
    const { container } = render(Card, { props: { bordered: false }, slots: { default: 'x' } });
    expect(container.firstElementChild).not.toHaveClass('border');
  });

  it('aplica padding md por defecto', () => {
    const { container } = render(Card, { slots: { default: 'x' } });
    expect(container.querySelector('.p-6')).toBeInTheDocument();
  });

  it('aplica padding none', () => {
    const { container } = render(Card, { props: { padding: 'none' }, slots: { default: 'x' } });
    expect(container.querySelector('.p-0')).toBeInTheDocument();
  });

  it('aplica padding lg', () => {
    const { container } = render(Card, { props: { padding: 'lg' }, slots: { default: 'x' } });
    expect(container.querySelector('.p-8')).toBeInTheDocument();
  });

  it('aplica shadow-md', () => {
    const { container } = render(Card, { props: { shadow: 'md' }, slots: { default: 'x' } });
    expect(container.firstElementChild).toHaveClass('shadow-md');
  });

  it('renderiza como article con prop as="article"', () => {
    const { container } = render(Card, { props: { as: 'article' }, slots: { default: 'x' } });
    expect(container.querySelector('article')).toBeInTheDocument();
  });
});
