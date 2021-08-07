const isDevelopment = process.env.REACT_APP_ENV === 'development';
export const url = isDevelopment
  ? 'http://localhost:4014'
  : 'http://172.105.83.137:4014';
