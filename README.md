# YouTube Content Generation with n8n

Ứng dụng web tạo nội dung từ video Youtube, sử dụng n8n làm backend, layout Bento, hỗ trợ tuỳ chỉnh tone, webhook động, log chi tiết và nhiều tính năng UI/UX đồng bộ theo phong cách YouTube.

## Tính năng nổi bật

- **Đăng nhập bảo mật bằng Firebase (email/password)**: Chỉ người dùng được cấp tài khoản mới sử dụng được app.
- **Custom Tone**: Tuỳ chỉnh tone cho AI bằng mẫu văn bản riêng.
- **Webhook động**: Hỗ trợ nhập webhook tuỳ chọn, lưu localStorage.
- **Log chi tiết**: Hiển thị thời gian, loại request, trạng thái với icon và màu sắc nổi bật (thành công: xanh lá, lỗi: đỏ YouTube).
- **Responsive, đẹp, hiện đại**: Giao diện Bento layout. Sử dụng React, Tailwind CSS, tối ưu trải nghiệm người dùng.

## Yêu cầu hệ thống

- Node.js >= 16
- npm >= 8 (hoặc yarn/pnpm)

## Hướng dẫn cài đặt & chạy local

### 1. Clone dự án

```bash
git clone https://github.com/duyasia/youtube-content.git
cd youtube-content
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Thiết lập biến môi trường Firebase

Tạo file `.env` ở thư mục gốc dự án:

```bash
cp .env.example .env
```

Thêm các biến sau (lấy từ Firebase Console và webhook n8n):

```env
VITE_DEFAULT_WEBHOOK=https://your-default-webhook-url.com
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Hướng dẫn lấy các giá trị này:**
>
> - Vào Firebase Console → Project settings → Your apps → Web app → Copy các giá trị từ `firebaseConfig`.
> - Không để dấu ngoặc kép quanh giá trị trong file `.env`.

Sau khi chỉnh sửa `.env`, **bạn cần khởi động lại server** để cập nhật biến môi trường.

### 4. Chạy ứng dụng ở chế độ phát triển

```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt và truy cập: [http://localhost:5173](http://localhost:5173)

### 5. Tạo tài khoản người dùng

- Vào Firebase Console → Authentication → Users → Add user để tạo tài khoản email/password cho người dùng.
- Chỉ người có tài khoản mới đăng nhập và sử dụng app.

## Ảnh giao diện mẫu

![YouTube Content Generation](https://auto.vnrom.net/uploads/post/5ttea5CeFo1.png)

![YouTube Content Generation](https://auto.vnrom.net/uploads/post/5tteapTkmdQ.png)

## Cấu trúc thư mục chính

```
src/
  components/
    CustomTone.tsx
    ResponseDisplay.tsx
    ContentForm.tsx
    LogDisplay.tsx
    Header.tsx
    SettingsPanel.tsx
  App.tsx
  Dashboard.tsx
  AuthContext.tsx
  LoginPage.tsx
  main.tsx
.env
vite.config.ts
tailwind.config.js
...
```

## Đóng góp & liên hệ

- Đóng góp: Pull Request, Issue đều được hoan nghênh!
- Liên hệ: hi@duy.asia

---

**Chúc bạn sử dụng ứng dụng hiệu quả!**
