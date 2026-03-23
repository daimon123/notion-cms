import { ref } from 'vue';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timeout?: number;
}

// 전역 토스트 상태
const toasts = ref<Toast[]>([]);
let nextId = 0;

// 토스트 알림 컴포저블
export function useToast() {
  function show(message: string, type: Toast['type'] = 'info', timeout = 3000) {
    const id = nextId++;
    toasts.value.push({ id, message, type, timeout });

    if (timeout > 0) {
      setTimeout(() => {
        dismiss(id);
      }, timeout);
    }
  }

  function dismiss(id: number) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }

  return {
    toasts,
    success: (message: string, timeout?: number) => show(message, 'success', timeout),
    error: (message: string, timeout?: number) => show(message, 'error', timeout),
    warning: (message: string, timeout?: number) => show(message, 'warning', timeout),
    info: (message: string, timeout?: number) => show(message, 'info', timeout),
    dismiss,
  };
}
