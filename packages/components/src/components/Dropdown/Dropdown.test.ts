import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { nextTick } from 'vue';
import Dropdown from './Dropdown.vue';

const items = [
  { id: 'edit',   label: 'Editar' },
  { id: 'dup',    label: 'Duplicar' },
  { id: 'sep',    label: '', separator: true },
  { id: 'delete', label: 'Eliminar', danger: true },
  { id: 'dis',    label: 'Desactivado', disabled: true },
];

function getTrigger(container: HTMLElement) {
  // The outer div[role="button"] is the clickable trigger
  return container.querySelector('[role="button"]') as HTMLElement;
}

describe('Dropdown', () => {
  it('renders trigger element with aria-haspopup', () => {
    const { container } = render(Dropdown, { props: { items } });
    expect(getTrigger(container)?.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('trigger aria-expanded is false initially', () => {
    const { container } = render(Dropdown, { props: { items } });
    expect(getTrigger(container)?.getAttribute('aria-expanded')).toBe('false');
  });

  it('menu is closed by default', () => {
    render(Dropdown, { props: { items } });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('opens menu on trigger click', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('trigger aria-expanded is true when open', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    expect(getTrigger(container)?.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders all non-separator items as menuitems', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(4); // edit, dup, delete, dis
  });

  it('emits select on item click', async () => {
    const { container, emitted } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    await fireEvent.click(screen.getByRole('menuitem', { name: 'Editar' }));
    expect(emitted().select).toBeTruthy();
    expect((emitted().select[0] as any[])[0].id).toBe('edit');
  });

  it('closes menu after selecting an item', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    await fireEvent.click(screen.getByRole('menuitem', { name: 'Editar' }));
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('does not emit for disabled item', async () => {
    const { container, emitted } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    await fireEvent.click(screen.getByRole('menuitem', { name: 'Desactivado' }));
    expect(emitted().select).toBeFalsy();
  });

  it('closes menu on Escape key', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    expect(screen.getByRole('menu')).toBeTruthy();
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('navigates with ArrowDown', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    await nextTick();
    expect(screen.getByRole('menu')).toBeTruthy();
  });

  it('selects focused item with Enter key', async () => {
    const { container, emitted } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    await fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });
    expect(emitted().select).toBeTruthy();
  });

  it('does not open when disabled', async () => {
    const { container } = render(Dropdown, { props: { items, disabled: true } });
    await fireEvent.click(getTrigger(container));
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('toggles closed on second click', async () => {
    const { container } = render(Dropdown, { props: { items } });
    await fireEvent.click(getTrigger(container));
    expect(screen.getByRole('menu')).toBeTruthy();
    await fireEvent.click(getTrigger(container));
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
