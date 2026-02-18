# 🌙 Tử Vi Đại Việt - Hệ Thống Luận Giải Tử Vi Chuyên Nghiệp

![Tử Vi Đại Việt Banner](https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80)

**Tử Vi Đại Việt** là một ứng dụng web hiện đại kết hợp giữa tinh hoa Lý Số phương Đông cổ truyền và trí tuệ nhân tạo (Generative AI) tiên tiến. Ứng dụng giúp người dùng lập lá số tử vi và nhận được những lời bình giải chuyên sâu, cá nhân hóa.

## ✨ Tính năng nổi bật

- **Lập Lá Số Tự Động**: Chuyển đổi ngày giờ sinh (Dương lịch/Âm lịch) sang lá số 12 cung chính xác.
- **Luận Giải AI (Gemini 3.0)**: Sử dụng mô hình AI mới nhất để đóng vai bậc thầy tử vi, đưa ra các lời khuyên về vận mệnh, sự nghiệp và tình duyên.
- **Giao Diện Huyền Bí**: Thiết kế phong cách Mystic sang trọng với Tailwind CSS và hiệu ứng Glassmorphism.
- **Hệ Thống Thanh Toán QR**: Tích hợp luồng mở khóa nội dung Premium qua VietQR (mô phỏng).
- **Phản Hồi Thời Gian Thực**: Luận giải được tạo ra tức thì và trình bày dưới dạng Markdown chuyên nghiệp.

## 🛠 Công nghệ sử dụng

- **Frontend**: React (ESM), Tailwind CSS.
- **AI Engine**: Google Gemini API (`@google/genai`).
- **Icons & Fonts**: Font Awesome, Playfair Display & Lora (Google Fonts).
- **Deployment Ready**: Tối ưu cho GitHub Pages hoặc Vercel.

## 🚀 Hướng dẫn cài đặt

### 1. Clone dự án
```bash
git clone https://github.com/your-username/tuvi-daiviet.git
cd tuvi-daiviet
```

### 2. Cấu hình API Key
Ứng dụng yêu cầu một API Key từ [Google AI Studio](https://aistudio.google.com/).
Thiết lập biến môi trường:
```bash
export API_KEY='YOUR_GEMINI_API_KEY'
```

### 3. Khởi chạy
Vì dự án sử dụng ESM trực tiếp trong trình duyệt, bạn có thể chạy bằng bất kỳ trình chủ tĩnh nào (Static Server):
```bash
npx serve .
```

## 📜 Giấy phép
Dự án được phát hành dưới giấy phép MIT.

---
*Lưu ý: Các lời luận giải từ AI mang tính chất tham khảo và giải trí.*