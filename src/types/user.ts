/**
 * 用户信息类型
 * 根据实际后端返回格式调整
 */
export interface User {
  id: string;
  username: string;
  nickname?: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
