import { z } from 'zod';

// 로그인 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(100, '비밀번호가 너무 깁니다.'),
});

// 회원가입 스키마
export const registerSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.').max(50, '이름이 너무 깁니다.'),
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Z]/, '대문자를 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*]/, '특수문자(!@#$%^&*)를 포함해야 합니다.'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
});

// 이메일 검증
export const emailSchema = z.string().email('올바른 이메일 형식이 아닙니다.');

// 공통 타입 추출
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
