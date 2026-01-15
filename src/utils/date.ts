import type { TFunction } from 'i18next';

/**
 * 日期格式化工具函数
 * 支持 i18n 国际化
 */

/**
 * 解析后端返回的日期字符串，处理时区问题
 * @param dateString 日期字符串
 * @returns Date 对象
 */
export const parseBackendDate = (dateString: string): Date => {
  // 如果时间字符串没有时区标识（Z、+、-），自动添加 'Z' 表示 UTC
  if (!dateString.endsWith('Z') && !dateString.includes('+') && !dateString.includes('-', 10)) {
    return new Date(`${dateString}Z`);
  }
  return new Date(dateString);
};

/**
 * 根据语言获取 locale
 */
const getLocale = (lang: string): string => {
  return lang.startsWith('zh') ? 'zh-CN' : 'en-US';
};

/**
 * 格式化时间为 HH:MM 格式（本地时区）
 * @param dateString 日期字符串
 * @param t i18n 翻译函数
 * @param lang 当前语言
 * @returns 格式化后的时间字符串
 */
export const formatTime = (dateString: string, t: TFunction, lang = 'en'): string => {
  try {
    const date = parseBackendDate(dateString);
    if (Number.isNaN(date.getTime())) {
      return t('date.unknown_time');
    }
    return date.toLocaleTimeString(getLocale(lang), {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return t('date.unknown_time');
  }
};

/**
 * 格式化日期为本地格式
 * @param dateString 日期字符串
 * @param t i18n 翻译函数
 * @param lang 当前语言
 * @returns 格式化后的日期字符串
 */
export const formatDate = (dateString: string, t: TFunction, lang = 'en'): string => {
  try {
    const date = parseBackendDate(dateString);
    if (Number.isNaN(date.getTime())) {
      return t('date.unknown_date');
    }
    return date.toLocaleDateString(getLocale(lang), {
      month: 'numeric',
      day: 'numeric',
    });
  } catch {
    return t('date.unknown_date');
  }
};

/**
 * 格式化完整日期时间
 * @param dateString 日期字符串
 * @param t i18n 翻译函数
 * @param lang 当前语言
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (dateString: string, t: TFunction, lang = 'en'): string => {
  try {
    const date = parseBackendDate(dateString);
    if (Number.isNaN(date.getTime())) {
      return t('date.unknown_time');
    }
    return date.toLocaleString(getLocale(lang), {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return t('date.unknown_time');
  }
};

/**
 * 获取相对时间描述（如：刚刚、5分钟前、1小时前）
 * @param dateString 日期字符串
 * @param t i18n 翻译函数
 * @param lang 当前语言
 * @returns 相对时间描述
 */
export const getRelativeTime = (dateString: string, t: TFunction, lang = 'en'): string => {
  try {
    const date = parseBackendDate(dateString);
    if (Number.isNaN(date.getTime())) {
      return t('date.unknown_time');
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return t('date.just_now');
    if (diffMin < 60) return t('date.minutes_ago', { count: diffMin });
    if (diffHour < 24) return t('date.hours_ago', { count: diffHour });
    if (diffDay < 7) return t('date.days_ago', { count: diffDay });

    // 超过7天显示具体日期
    return formatDate(dateString, t, lang);
  } catch {
    return t('date.unknown_time');
  }
};
