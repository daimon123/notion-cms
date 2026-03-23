import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

// 비밀번호 해시화
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// 비밀번호 검증
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
