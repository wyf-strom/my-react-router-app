// src/api/request.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// 类型声明
interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

interface CustomAxiosConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _isDownload?: boolean;
}

class Request {
  private instance: AxiosInstance;
  //自动重试超时请求
  private retryLimit = 2;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    this.setupInterceptors();
  }

  // 初始化拦截器
  private setupInterceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const config = response.config as CustomAxiosConfig;

        // 文件下载处理
        if (config._isDownload) {
          return this.handleFileDownload(response);
        }

        // 常规响应处理
        const { data } = response;
        if (data?.success) {
          return data.data;
        }
        return Promise.reject(new Error(data?.message || 'Unknown error'));
      },
      (error: AxiosError) => {
        const config = error.config as CustomAxiosConfig;

        // 自动重试逻辑
        if (
          error.code === 'ECONNABORTED' &&
          !config._retry &&
          (config._retryCount || 0) < this.retryLimit
        ) {
          config._retry = true;
          config._retryCount = (config._retryCount || 0) + 1;
          return this.instance(config);
        }

        // 错误统一处理
        return this.handleError(error);
      }
    );
  }

  // 处理文件下载
  private handleFileDownload(response: AxiosResponse) {
    const filename = this.getFilenameFromHeaders(response.headers);
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE/Edge
      window.navigator.msSaveBlob(blob, filename);
    } else {
      // 现代浏览器
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }

    return Promise.resolve({ success: true });
  }

  // 从响应头获取文件名
  private getFilenameFromHeaders(headers: AxiosResponse['headers']) {
    const contentDisposition = headers['content-disposition'] || '';
    const match = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
    return match ? match[1] : `file_${Date.now()}`;
  }

  // 统一错误处理
  private handleError(error: AxiosError) {
    const status = error.response?.status;
    let message = '';

    switch (status) {
      case 401:
        message = '登录已过期，请重新登录';
        window.location.href = '/login';
        break;
      case 403:
        message = '您没有权限访问此资源';
        break;
      case 500:
        message = '服务器内部错误';
        break;
      default:
        message = error.message || '网络连接异常';
    }

    // 可扩展：发送错误日志到服务器
    console.error(`[API Error] ${error.config?.url}:`, error);

    return Promise.reject({
      code: status || -1,
      message,
      data: error.response?.data,
    });
  }

  // 通用请求方法
  public request<T = any>(config: CustomAxiosConfig): Promise<T> {
    return this.instance(config);
  }

  // 文件下载封装
  public download(url: string, params?: any, method: 'GET' | 'POST' = 'GET') {
    return this.request({
      url,
      method,
      [method === 'GET' ? 'params' : 'data']: params,
      responseType: 'blob',
      _isDownload: true,
    });
  }
}

// 单例模式导出
export const httpClient = new Request().request;
export const downloadFile = new Request().download;
