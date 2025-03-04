import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// 基础响应类型
interface BaseResponse<T = any> {
  code: number;
  data: T;
  message?: string;
}

// 创建自定义实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 请求拦截器
service.interceptors.request.use(config => {
  // 可在此统一添加token等逻辑
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const contentType = response.headers['content-type'];

    // 处理文件流响应
    if (
      contentType?.includes('application/octet-stream') ||
      contentType?.includes('application/zip') ||
      contentType?.includes('application/pdf') ||
      response.request.responseType === 'arraybuffer'
    ) {
      return handleFileDownload(response);
    }

    // 处理JSON响应
    const res: BaseResponse = response.data;
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(new Error(res.message || 'Error'));
  },
  error => {
    return handleError(error);
  }
);

// 处理文件下载
function handleFileDownload(response: AxiosResponse) {
  const filename = getFilenameFromHeaders(response.headers);
  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  });

  //@ts-ignore
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE/Edge
    //@ts-ignore
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

//获取文件名
function getFilenameFromHeaders(headers: AxiosResponse['headers']) {
  const contentDisposition = headers['content-disposition'] || '';
  const match = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
  return match ? match[1] : `file_${Date.now()}`;
}

// 统一错误处理
function handleError(error: AxiosError) {
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

export default service;
