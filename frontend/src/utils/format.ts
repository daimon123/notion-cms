import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

// 날짜 포맷
export function formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}

// 날짜시간 포맷
export function formatDateTime(date: string | Date): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

// 상대 시간 포맷 (예: 3시간 전)
export function fromNow(date: string | Date): string {
  return dayjs(date).fromNow();
}

// 숫자 천 단위 구분
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value);
}

// 파일 크기 포맷
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// 전화번호 포맷
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
}
