
import { GoogleGenAI } from "@google/genai";
import { UserInfo } from "../types";

// Initialize GoogleGenAI with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHoroscopeInterpretation = async (userInfo: UserInfo, section: string, isPremium: boolean = false) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Bạn là một bậc thầy tử vi cao cấp tại Việt Nam với hơn 30 năm kinh nghiệm nghiên cứu lý số cổ truyền. 
    Hãy thực hiện luận giải tử vi cho người dùng sau:
    Họ tên: ${userInfo.fullName}
    Ngày sinh: ${userInfo.birthDate}
    Giờ sinh: ${userInfo.birthTime}
    Giới tính: ${userInfo.gender}
    Loại lịch: ${userInfo.calendarType}

    Bối cảnh hiện tại: Năm 2026 (Bính Ngọ).

    Yêu cầu:
    - Mục cần luận giải: ${section}
    - Văn phong: Chuyên sâu, huyền bí, trang trọng, sử dụng thuật ngữ tử vi chính xác (Sao, Cung, Hạn, Tuần, Triệt...). Không được nhắc đến từ "AI" hay "trí tuệ nhân tạo" trong nội dung luận giải. Hãy đóng vai một chuyên gia thực thụ.
    - Độ dài: ${isPremium ? 'Khoảng 1000-1500 chữ, cực kỳ chi tiết từng khía cạnh' : 'Khoảng 400 chữ, tóm lược sơ bộ nhưng sâu sắc'}.
    - Nếu là nội dung Free, hãy đưa ra nhận định tổng quan về vận trình năm 2026 nhưng kích thích tò mò về các phần chuyên sâu của 12 cung.
    - Định dạng: Markdown đẹp mắt, trình bày rõ ràng, dễ đọc.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    // Return text property directly as per guidelines
    return response.text || "Xin lỗi, hiện tại hệ thống luận giải đang bận. Vui lòng thử lại sau.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã có lỗi xảy ra trong quá trình luận giải. Vui lòng kiểm tra kết nối mạng.";
  }
};
