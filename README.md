# AI Content Generator Web App

Ứng dụng web tạo nội dung từ video Youtube, sử dụng n8n làm backend, layout Bento, hỗ trợ tuỳ chỉnh tone, webhook, log chi tiết và nhiều tính năng UI/UX đồng bộ theo phong cách YouTube.

## Tính năng nổi bật

- **Giao diện Bento layout**: Header, Content Input, Custom Tone, Generated Content, Request Log, nút Generate bố trí khoa học, hiện đại.
- **Custom Tone**: Tuỳ chỉnh tone cho AI bằng mẫu văn bản riêng, icon Feather màu trắng nổi bật.
- **Webhook động**: Hỗ trợ nhập webhook tuỳ chọn hoặc dùng mặc định từ biến môi trường.
- **Log chi tiết**: Hiển thị thời gian, loại request, trạng thái với icon và màu sắc nổi bật (thành công: xanh lá, lỗi: đỏ YouTube).
- **Đồng bộ màu sắc**: Chủ đạo #ff0034 (đỏ YouTube), icon, border, nền, padding, bo góc đồng bộ.
- **Responsive, đẹp, hiện đại**: Sử dụng React, Tailwind CSS, tối ưu trải nghiệm người dùng.

## Yêu cầu hệ thống

- Node.js >= 16
- npm >= 8 (hoặc yarn/pnpm)

## Hướng dẫn cài đặt & chạy local

### 1. Clone dự án

```bash
git clone <link-repo-của-bạn>
cd <tên-thư-mục-dự-án>
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Thiết lập biến môi trường

Tạo file `.env` ở thư mục gốc dự án, thêm biến sau (nếu muốn dùng webhook mặc định và đặt password):

```env
VITE_DEFAULT_WEBHOOK=https://your-default-webhook-url.com
VITE_PASSWORD=strongPassword
```

Hoặc chạy lệnh sau để copy mẫu env:
```bash
cp .env.example .env
```

> **Lưu ý:**
>
> - Nếu không nhập webhook khi sử dụng app, app sẽ lấy giá trị từ biến môi trường này.
> - Nếu không có biến môi trường và không nhập webhook, app sẽ báo lỗi và không gửi request.

Sau khi chỉnh sửa `.env`, **bạn cần khởi động lại server** để cập nhật biến môi trường.

### 4. Chạy ứng dụng ở chế độ phát triển

```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt và truy cập: [http://localhost:5173](http://localhost:5173)

## Ảnh giao diện mẫu

> (Bạn có thể chèn ảnh chụp màn hình ở đây)

## Cấu trúc thư mục chính

```
src/
  components/
    CustomTone.tsx
    ResponseDisplay.tsx
    ...
  App.tsx
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
