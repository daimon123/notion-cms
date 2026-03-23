import { ref } from 'vue';
import type { AxiosError } from 'axios';

// API 호출 래퍼 컴포저블
export function useApi<T>(apiFn: (...args: unknown[]) => Promise<{ data: { data: T } }>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function execute(...args: unknown[]) {
    loading.value = true;
    error.value = null;
    try {
      const response = await apiFn(...args);
      data.value = response.data.data;
      return data.value;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      error.value = axiosError.response?.data?.message || '오류가 발생했습니다.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, execute };
}
