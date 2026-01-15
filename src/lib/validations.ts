import type { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * 通用验证 Schema 集合
 * 支持 i18n 国际化
 */

// ===== Schema 工厂函数（支持 i18n）=====

/**
 * 创建用户名验证 Schema
 */
export const createUsernameSchema = (t: TFunction) =>
  z
    .string()
    .min(3, t('validation.username_min'))
    .max(20, t('validation.username_max'))
    .regex(/^[a-zA-Z0-9_]+$/, t('validation.username_pattern'));

/**
 * 创建邮箱验证 Schema
 */
export const createEmailSchema = (t: TFunction) => z.string().email(t('validation.email_invalid'));

/**
 * 创建密码验证 Schema
 */
export const createPasswordSchema = (t: TFunction) =>
  z.string().min(6, t('validation.password_min')).max(50, t('validation.password_max'));

/**
 * 创建强密码验证 Schema（包含大小写字母、数字和特殊字符）
 */
export const createStrongPasswordSchema = (t: TFunction) =>
  z
    .string()
    .min(8, t('validation.password_min'))
    .max(50, t('validation.password_max'))
    .regex(/[a-z]/, t('validation.password_lowercase'))
    .regex(/[A-Z]/, t('validation.password_uppercase'))
    .regex(/[0-9]/, t('validation.password_digit'))
    .regex(/[^a-zA-Z0-9]/, t('validation.password_special'));

/**
 * 创建登录表单 Schema
 */
export const createLoginSchema = (t: TFunction) =>
  z.object({
    username: createUsernameSchema(t),
    password: createPasswordSchema(t),
  });

/**
 * 创建注册表单 Schema
 */
export const createRegisterSchema = (t: TFunction) =>
  z
    .object({
      username: createUsernameSchema(t),
      email: createEmailSchema(t),
      password: createPasswordSchema(t),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.password_mismatch'),
      path: ['confirmPassword'],
    });

/**
 * 创建个人资料 Schema
 */
export const createProfileSchema = (t: TFunction) =>
  z.object({
    nickname: z.string().min(1, t('validation.nickname_required')).max(30, t('validation.nickname_max')),
    email: createEmailSchema(t),
    bio: z.string().max(200, t('validation.bio_max')).optional(),
    website: z.string().url(t('validation.url_invalid')).optional().or(z.literal('')),
  });

// ===== 类型导出 =====
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
export type ProfileFormData = z.infer<ReturnType<typeof createProfileSchema>>;
