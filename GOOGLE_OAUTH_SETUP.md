# Hướng Dẫn Setup Google OAuth

## Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Ghi nhớ Project ID

## Bước 2: Bật Google+ API

1. Trong Google Cloud Console, chọn "APIs & Services" > "Library"
2. Tìm kiếm "Google+ API" hoặc "Google Identity"
3. Bật API này

## Bước 3: Tạo OAuth 2.0 Client ID

1. Vào "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client ID"
3. Chọn "Web application"
4. Đặt tên cho Client ID (ví dụ: "Vật Tư Chính Hãng Web Client")
5. Thêm Authorized JavaScript origins:
   - `http://localhost:4200` (cho development)
   - `https://yourdomain.com` (cho production)
6. Click "Create"

## Bước 4: Cấu hình trong ứng dụng

1. Copy Client ID từ Google Cloud Console
2. Mở file `src/app/config/google.config.ts`
3. Thay thế `YOUR_GOOGLE_CLIENT_ID` bằng Client ID thực

```typescript
export const GOOGLE_CONFIG = {
  CLIENT_ID: '123456789-abcdefghijklmnop.apps.googleusercontent.com', // Thay thế bằng Client ID thực
  // ... rest of config
};
```

## Bước 5: Test Google Login

1. Chạy ứng dụng: `npm start`
2. Truy cập trang login
3. Click nút "Google"
4. Chọn tài khoản Google để đăng nhập
5. Kiểm tra console để xem thông tin user

## Lưu ý quan trọng

- **Development**: Sử dụng `http://localhost:4200`
- **Production**: Thay đổi domain trong Authorized JavaScript origins
- **Security**: Không commit Client ID vào public repository
- **Testing**: Có thể sử dụng tài khoản Google test

## Troubleshooting

### Lỗi "This app isn't verified"
- Trong development, click "Advanced" > "Go to [app name] (unsafe)"
- Hoặc verify app trong Google Cloud Console

### Lỗi "redirect_uri_mismatch"
- Kiểm tra domain trong Authorized JavaScript origins
- Đảm bảo protocol (http/https) đúng

### Lỗi "invalid_client"
- Kiểm tra Client ID có đúng không
- Đảm bảo đã bật Google+ API
