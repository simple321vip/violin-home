import { type } from "os";

// config/index.js
const env = process.env.NODE_ENV!;

const configObj: any = {
  production: {
    BAIDU_CLOUD_URL: 'http://openapi.baidu.com/oauth/2.0/authorize',
    RESPONSE_TYPE: '?response_type=' + 'code',
    CLIENT_ID: '&client_id=' + 'WksD0FOVAp8zSRV62qNKxtnCexArVPOf',
    REDIRECT_URI: '&redirect_uri=' + 'https://www.violin-home.cn/auth/api/v1/authorize/baidu',
    SCOPE: '&scope=basic,netdisk',
    DEVICE_ID: '&device_id=26202308',
    QR_CODE: '&qrcode=' + '1',
    DISPLAY: '&display=popup'
  },
  development: {
    BAIDU_CLOUD_URL: 'http://openapi.baidu.com/oauth/2.0/authorize',
    RESPONSE_TYPE: '?response_type=' + 'code',
    CLIENT_ID: '&client_id=' + 'BIukdHDXeNPmIXe96GA6OOXGgnP5GEhM',
    REDIRECT_URI: '&redirect_uri=' + 'http://localhost:8080/auth/api/v1/authorize/baidu',
    SCOPE: '&scope=basic,netdisk',
    DEVICE_ID: '&device_id=26202308',
    QR_CODE: '&qrcode=' + '1',
    DISPLAY: '&display=popup'
  }
};

export default { ...configObj[env] };
