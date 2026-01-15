import type { TFunction } from 'i18next';
import { describe, expect, it } from 'vitest';
import {
  createEmailSchema,
  createLoginSchema,
  createPasswordSchema,
  createRegisterSchema,
  createUsernameSchema,
} from './validations';

// Mock i18n t 函数 - 返回 key 作为消息，便于测试
const mockT: TFunction = ((key: string) => key) as TFunction;

describe('验证 Schema 测试', () => {
  describe('usernameSchema', () => {
    const usernameSchema = createUsernameSchema(mockT);

    it('应该接受有效的用户名', () => {
      expect(usernameSchema.safeParse('john_doe').success).toBe(true);
      expect(usernameSchema.safeParse('user123').success).toBe(true);
      expect(usernameSchema.safeParse('ABC').success).toBe(true);
    });

    it('应该拒绝过短的用户名', () => {
      const result = usernameSchema.safeParse('ab');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('validation.username_min');
      }
    });

    it('应该拒绝包含特殊字符的用户名', () => {
      const result = usernameSchema.safeParse('user@name');
      expect(result.success).toBe(false);
    });
  });

  describe('emailSchema', () => {
    const emailSchema = createEmailSchema(mockT);

    it('应该接受有效的邮箱', () => {
      expect(emailSchema.safeParse('test@example.com').success).toBe(true);
      expect(emailSchema.safeParse('user.name@domain.co.uk').success).toBe(true);
    });

    it('应该拒绝无效的邮箱', () => {
      expect(emailSchema.safeParse('invalid-email').success).toBe(false);
      expect(emailSchema.safeParse('test@').success).toBe(false);
      expect(emailSchema.safeParse('@domain.com').success).toBe(false);
    });
  });

  describe('passwordSchema', () => {
    const passwordSchema = createPasswordSchema(mockT);

    it('应该接受有效的密码', () => {
      expect(passwordSchema.safeParse('password123').success).toBe(true);
      expect(passwordSchema.safeParse('123456').success).toBe(true);
    });

    it('应该拒绝过短的密码', () => {
      const result = passwordSchema.safeParse('12345');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('validation.password_min');
      }
    });
  });

  describe('loginSchema', () => {
    const loginSchema = createLoginSchema(mockT);

    it('应该接受有效的登录数据', () => {
      const result = loginSchema.safeParse({
        username: 'testuser',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('应该拒绝无效的登录数据', () => {
      const result = loginSchema.safeParse({
        username: 'ab', // 太短
        password: '123', // 太短
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    const registerSchema = createRegisterSchema(mockT);

    it('应该接受有效的注册数据', () => {
      const result = registerSchema.safeParse({
        username: 'newuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('应该拒绝密码不匹配的注册数据', () => {
      const result = registerSchema.safeParse({
        username: 'newuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'different',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('validation.password_mismatch');
      }
    });
  });
});
