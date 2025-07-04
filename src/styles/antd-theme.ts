/*
 * @Date: 2025-07-03 10:37:39
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-07-04 16:02:27
 * @Description:主题样式
 */
import type { ThemeConfig } from 'antd';

const antdTheme: ThemeConfig = {
  token: {
    // 主题色
    colorPrimary: 'var(--primary-color)',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // 字体
    fontSize: 14,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    // 边框
    borderRadius: 6,

    // 其他 token 配置...
  },
  components: {
    // 组件级别的样式覆盖
    Button: {
      colorPrimary: '#1890ff',
      algorithm: true, // 启用算法
    },
    Input: {
      colorBorder: '#d9d9d9',
      borderRadius: 4,
    },
    // 其他组件配置...
  },
};

export default antdTheme;
