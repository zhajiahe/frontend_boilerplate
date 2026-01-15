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

// ===== 静态 Schema（向后兼容，使用默认中文消息）=====

// 用户名验证
export const usernameSchema = z
  .string()
  .min(3, '用户名至少 3 个字符')
  .max(20, '用户名最多 20 个字符')
  .regex(/^[a-zA-Z0-9_]+$/, '用户名只能包含字母、数字和下划线');

// 邮箱验证
export const emailSchema = z.string().email('请输入有效的邮箱地址');

// 密码验证
export const passwordSchema = z.string().min(6, '密码至少 6 个字符').max(50, '密码最多 50 个字符');

// 强密码验证（包含大小写字母、数字和特殊字符）
export const strongPasswordSchema = z
  .string()
  .min(8, '密码至少 8 个字符')
  .max(50, '密码最多 50 个字符')
  .regex(/[a-z]/, '密码必须包含小写字母')
  .regex(/[A-Z]/, '密码必须包含大写字母')
  .regex(/[0-9]/, '密码必须包含数字')
  .regex(/[^a-zA-Z0-9]/, '密码必须包含特殊字符');

// 手机号验证（中国大陆）
export const phoneSchema = z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号');

// URL 验证
export const urlSchema = z.string().url('请输入有效的 URL');

// 登录表单 Schema
export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

// 注册表单 Schema
export const registerSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

// 个人资料 Schema
export const profileSchema = z.object({
  nickname: z.string().min(1, '昵称不能为空').max(30, '昵称最多 30 个字符'),
  email: emailSchema,
  bio: z.string().max(200, '简介最多 200 个字符').optional(),
  website: urlSchema.optional().or(z.literal('')),
});

// ===== 类型导出 =====
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
