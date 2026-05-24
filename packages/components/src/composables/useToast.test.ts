import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useToast } from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    const { toasts, remove } = useToast();
    // limpiar estado compartido entre tests
    [...toasts.value].forEach((t) => remove(t.id));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with empty toasts', () => {
    const { toasts } = useToast();
    expect(toasts.value.length).toBe(0);
  });

  it('adds a toast', () => {
    const { add, toasts } = useToast();
    add('Hola mundo', 'info', 0);
    expect(toasts.value.length).toBe(1);
    expect(toasts.value[0].message).toBe('Hola mundo');
    expect(toasts.value[0].type).toBe('info');
  });

  it('returns the id of the new toast', () => {
    const { add } = useToast();
    const id = add('Test', 'success', 0);
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('removes a toast by id', () => {
    const { add, remove, toasts } = useToast();
    const id = add('Toast a borrar', 'info', 0);
    expect(toasts.value.length).toBe(1);
    remove(id);
    expect(toasts.value.length).toBe(0);
  });

  it('success helper adds toast with success type', () => {
    const { success, toasts } = useToast();
    success('Guardado', 0);
    expect(toasts.value[0].type).toBe('success');
  });

  it('danger helper adds toast with danger type', () => {
    const { danger, toasts } = useToast();
    danger('Error', 0);
    expect(toasts.value[0].type).toBe('danger');
  });

  it('warning helper adds toast with warning type', () => {
    const { warning, toasts } = useToast();
    warning('Atención', 0);
    expect(toasts.value[0].type).toBe('warning');
  });

  it('info helper adds toast with info type', () => {
    const { info, toasts } = useToast();
    info('Info', 0);
    expect(toasts.value[0].type).toBe('info');
  });

  it('auto-removes toast after duration', async () => {
    vi.useFakeTimers();
    const { add, toasts } = useToast();
    add('Auto-remove', 'info', 100);
    expect(toasts.value.length).toBe(1);
    vi.advanceTimersByTime(150);
    expect(toasts.value.length).toBe(0);
  });

  it('does not auto-remove when duration is 0', async () => {
    vi.useFakeTimers();
    const { add, toasts } = useToast();
    add('Permanente', 'info', 0);
    vi.advanceTimersByTime(5000);
    expect(toasts.value.length).toBe(1);
  });
});
