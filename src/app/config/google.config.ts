// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  // Thay thế bằng Google Client ID thực từ Google Cloud Console
  CLIENT_ID: '634965467839-m40nkrj1smthsarhc9nebbpvs044otcc.apps.googleusercontent.com',
  
  // Các scopes cần thiết
  SCOPES: [
    'openid',
    'email',
    'profile'
  ],
  
  // Redirect URI (nếu cần)
  REDIRECT_URI: window.location.origin + '/login'
};

// Hướng dẫn setup Google OAuth:
// 1. Truy cập Google Cloud Console: https://console.cloud.google.com/
// 2. Tạo project mới hoặc chọn project hiện có
// 3. Bật Google+ API
// 4. Tạo OAuth 2.0 Client ID
// 5. Thêm domain của bạn vào Authorized JavaScript origins
// 6. Copy Client ID và thay thế YOUR_GOOGLE_CLIENT_ID ở trên
