import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import Pagination from './Pagination.vue';

describe('Pagination', () => {
  it('renders prev and next buttons', () => {
    render(Pagination, { props: { modelValue: 1, total: 50, perPage: 10 } });
    expect(screen.getByLabelText('Página anterior')).toBeTruthy();
    expect(screen.getByLabelText('Página siguiente')).toBeTruthy();
  });

  it('disables prev on first page', () => {
    render(Pagination, { props: { modelValue: 1, total: 50, perPage: 10 } });
    expect(screen.getByLabelText('Página anterior')).toBeDisabled();
  });

  it('disables next on last page', () => {
    render(Pagination, { props: { modelValue: 5, total: 50, perPage: 10 } });
    expect(screen.getByLabelText('Página siguiente')).toBeDisabled();
  });

  it('emits update:modelValue when clicking a page', async () => {
    const { emitted } = render(Pagination, { props: { modelValue: 1, total: 50, perPage: 10 } });
    await fireEvent.click(screen.getByLabelText('Página 3'));
    expect(emitted()['update:modelValue'][0]).toEqual([3]);
  });

  it('emits next page when clicking next', async () => {
    const { emitted } = render(Pagination, { props: { modelValue: 2, total: 50, perPage: 10 } });
    await fireEvent.click(screen.getByLabelText('Página siguiente'));
    expect(emitted()['update:modelValue'][0]).toEqual([3]);
  });

  it('marks current page with aria-current="page"', () => {
    render(Pagination, { props: { modelValue: 2, total: 50, perPage: 10 } });
    expect(screen.getByLabelText('Página 2').getAttribute('aria-current')).toBe('page');
  });

  it('shows ellipsis for large page ranges', () => {
    render(Pagination, { props: { modelValue: 5, total: 200, perPage: 10 } });
    const ellipses = screen.getAllByText('…');
    expect(ellipses.length).toBeGreaterThan(0);
  });
});
