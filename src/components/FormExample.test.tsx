import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { FormExample } from './FormExample';

// Mock useToast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('FormExample 组件', () => {
  it('应该渲染表单字段', () => {
    render(<FormExample />);

    expect(screen.getByLabelText(/用户名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/邮箱/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^密码$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/确认密码/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /注册/i })).toBeInTheDocument();
  });

  it('应该显示用户名验证错误', async () => {
    const user = userEvent.setup();
    render(<FormExample />);

    const usernameInput = screen.getByLabelText(/用户名/i);
    await user.type(usernameInput, 'ab');
    await user.click(screen.getByRole('button', { name: /注册/i }));

    await waitFor(() => {
      expect(screen.getByText(/用户名至少 3 个字符/i)).toBeInTheDocument();
    });
  });

  it('应该显示密码不匹配错误', async () => {
    const user = userEvent.setup();
    render(<FormExample />);

    await user.type(screen.getByLabelText(/用户名/i), 'testuser');
    await user.type(screen.getByLabelText(/邮箱/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^密码$/i), 'password123');
    await user.type(screen.getByLabelText(/确认密码/i), 'different');
    await user.click(screen.getByRole('button', { name: /注册/i }));

    await waitFor(() => {
      expect(screen.getByText(/两次输入的密码不一致/i)).toBeInTheDocument();
    });
  });

  it('应该成功提交有效的表单', async () => {
    const user = userEvent.setup();
    render(<FormExample />);

    await user.type(screen.getByLabelText(/用户名/i), 'testuser');
    await user.type(screen.getByLabelText(/邮箱/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^密码$/i), 'password123');
    await user.type(screen.getByLabelText(/确认密码/i), 'password123');
    await user.click(screen.getByRole('button', { name: /注册/i }));

    // 提交时按钮应该显示加载状态
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /提交中/i })).toBeInTheDocument();
    });
  });
});
