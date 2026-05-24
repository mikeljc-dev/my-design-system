import { ref, readonly } from 'vue';

export interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'danger' | 'warning';
  duration: number;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  function add(message: string, type: Toast['type'] = 'info', duration = 4000) {
    const id = Math.random().toString(36).slice(2);
    toasts.value.push({ id, message, type, duration });

    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }

    return id;
  }

  function remove(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return {
    toasts: readonly(toasts),
    add,
    remove,
    success: (msg: string, duration?: number) => add(msg, 'success', duration),
    danger:  (msg: string, duration?: number) => add(msg, 'danger', duration),
    warning: (msg: string, duration?: number) => add(msg, 'warning', duration),
    info:    (msg: string, duration?: number) => add(msg, 'info', duration),
  };
}
