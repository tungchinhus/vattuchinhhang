# Hướng dẫn Deploy lên Firebase Hosting

## Cài đặt Firebase CLI (nếu chưa có)
```bash
npm install -g firebase-tools
```

## Đăng nhập Firebase
```bash
firebase login
```

## Deploy ứng dụng

### Cách 1: Deploy đầy đủ (build + deploy)
```bash
npm run deploy
```

### Cách 2: Deploy chỉ hosting (nếu đã build)
```bash
npm run deploy:hosting
```

### Cách 3: Deploy thủ công
```bash
# Build ứng dụng
ng build --configuration production

# Deploy lên Firebase
firebase deploy
```

## URLs
- **Hosting URL**: https://vattuchinhhang.web.app
- **Firebase Console**: https://console.firebase.google.com/project/vattuchinhhang-c5952/overview

## Cấu hình
- **Public directory**: `dist/vattuchinhhang/browser`
- **Firebase project**: `vattuchinhhang-c5952`
- **Hosting target**: `vattuchinhhang` (custom domain)
- **Rewrite rules**: Tất cả routes đều redirect về `/index.html` (cho Angular routing)

## Custom Domain
- **Primary URL**: https://vattuchinhhang.web.app
- **Fallback URL**: https://vattuchinhhang-c5952.web.app
- **Target site**: `vattuchinhhang`

## Lưu ý
- Đảm bảo đã build ứng dụng trước khi deploy
- Kiểm tra file `firebase.json` và `.firebaserc` đã được cấu hình đúng
- Sử dụng `firebase deploy --only hosting` để deploy chỉ hosting (nhanh hơn)
